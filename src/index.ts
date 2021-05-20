import { RedisClient } from "redis";
import ws from "ws";
import { v4 as uuidv4 } from "uuid";
import amqplib from "amqplib";
import { starWars, uniqueNamesGenerator } from "unique-names-generator";
import WilsonServer from "./wilson/WilsonServer";

const serverUuid: string = uuidv4();
const serverName: string = uniqueNamesGenerator({ dictionaries: [starWars], length: 1 });
const wssPort: number = (process.env.WSS_PORT) ? parseInt(process.env.WSS_PORT) : 9000;

// --- AMQP connection
const AMQP_EXCHANGE: string = "messaging";
let amqpRxChannel: amqplib.Channel;
let amqpTxChannel: amqplib.Channel;

// --- Creating Redis connection
const redisClient: RedisClient = new RedisClient({ host: "127.0.0.1", connect_timeout: 10000 });

redisClient.on("error", (err: Error) => {
    console.error(err.message);
});

// --- Creating WSS
const wss: ws.Server = new ws.Server({ port: wssPort });

const wilsonServer: WilsonServer = new WilsonServer({ server: wss, name: serverName });

async function startAmqpConnection(opts: amqplib.Options.Connect) {

    const amqpConnection: amqplib.Connection = await amqplib.connect(opts);

    // Creating Tx and Rx channels
    amqpRxChannel = await amqpConnection.createChannel();
    amqpTxChannel = await amqpConnection.createChannel();

    // --- RX
    // Connect channel to the exhange
    await amqpRxChannel.assertExchange(AMQP_EXCHANGE, 'direct', {
        durable: true
    });

    // Connect to the queue for this server
    const rxQueue: amqplib.Replies.AssertQueue = await amqpRxChannel.assertQueue("", {
        exclusive: true
    });

    // Bind this queue to the exchange
    await amqpRxChannel.bindQueue(rxQueue.queue, AMQP_EXCHANGE, serverUuid);

    // Listen for messages on this queue
    amqpRxChannel.consume(rxQueue.queue, (message) => {
        console.log(`New message for ${serverUuid}: ${message?.content.toString()}`);
    });

    // --- TX
    // Connect channel to exchange
    await amqpTxChannel.assertExchange(AMQP_EXCHANGE, 'direct', {
        durable: true
    });

}

async function startServer() {

    try {

        console.log(`WSS Port: ${wssPort} | Server Name: ${serverName} (${serverUuid})`);

        // Start AMQP
        await startAmqpConnection({
            vhost: "wilson",
            hostname: "localhost",
            username: "guest",
            password: "guest",
            protocol: "amqp",
            port: 5672
        });

    } catch (err) {
        console.error(err.stack);
    }

}

async function cleanup() {

    // Close down websocket server
    wss.close();

    // Close Rabbit channels
    await amqpRxChannel.close();
    await amqpTxChannel.close();

}

async function getServerUUIDFromUsername(username: string): Promise<string> {

    const key: string = `user:${username}`;

    return new Promise((res, rej) => {
        redisClient.hget(key, "server_uuid", (err, _uuid) => {
            if (err) return rej(err);
            return res(_uuid);
        })
    })

}

async function registerUser(username: string): Promise<void> {

    const key: string = `user:${username}`;

    return new Promise((res, rej) => {

        redisClient.exists(key, (err, exists) => {
            if (err) return rej(err);
            if (exists) return rej(new Error("User has already exists"))
            redisClient.hmset(key, { "server_uuid": serverUuid }, (err) => {
                if (err) return rej(err);
                return res();
            });
        })

    })

}

wilsonServer.on("authenticate", (client, payload) => {
    console.log(`New authentication from ${client.id}, u:${payload.username}, p:${payload.password}`);
});

wilsonServer.on("message", (client, payload) => {



});

// --- Start server
startServer();

process.on("SIGTERM", async () => {
    console.warn("SIGTERM called, killing services...");
    await cleanup();
    process.exit(0);
});

process.on("SIGINT", async () => {
    console.warn("SIGINT called, killing services...");
    await cleanup();
    process.exit(0);
});
