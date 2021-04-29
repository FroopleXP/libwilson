import { RedisClient } from "redis";
import ws from "ws";
import { v4 as uuidv4 } from "uuid";
import amqplib from "amqplib";

import IWebSocketClientMessage from "./domain/interfaces/IWebSocketClientMessage";
import WebSocketClientAction from "./domain/enums/WebSocketClientAction";

const serverUuid: string = uuidv4();
const wssPort: number = (process.env.WSS_PORT) ? parseInt(process.env.WSS_PORT) : 9000;

// --- AMQP connection
let amqpChannel: amqplib.Channel;

// --- Creating Redis connection
const redisClient: RedisClient = new RedisClient({ host: "127.0.0.1", connect_timeout: 10000 });

redisClient.on("error", (err: Error) => {
    console.error(err.message);
});

// --- Creating WSS
const wss: ws.Server = new ws.Server({ port: wssPort });

async function startAmqpConnection(opts: amqplib.Options.Connect) {

    const amqpConnection: amqplib.Connection = await amqplib.connect(opts);

    amqpChannel = await amqpConnection.createChannel();
    await amqpChannel.bindQueue("messages", "messaging", serverUuid);

    await amqpChannel.consume("messages", (msg) => {
        console.log(msg?.content.toString())
    });

    console.log("Connected to RabbitMQ");

}

async function startServer() {

    try {

        console.log(`WSS Port: ${wssPort} | Server UUID: ${serverUuid}`);

        // Start AMQP
        await startAmqpConnection({
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

    console.info("Cleaning up...");

    // Close all connected clients with a reason
    wss.clients.forEach((socket) => {
        socket.close(1011, "Server closing down")
    });

    // Close down websocket serber
    wss.close();

    // Unbind server id from queue
    await amqpChannel.unbindQueue("messages", "messaging", serverUuid);

    // Close Rabbit connection
    await amqpChannel.close();

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

    const key: string = `user:${username}`

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

wss.on("connection", (ws: WebSocket) => {

    ws.onmessage = (event) => {

        // Parse JSON
        const parsed: any = JSON.parse(event.data);
        const message: IWebSocketClientMessage = { action: parsed.action, payload: parsed.payload };

        switch (message.action) {
            case WebSocketClientAction.AUTHENTICATE:
                registerUser(message.payload.username).then().catch((err) => {
                    ws.close(1008, err.message);
                });
        }

    }

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
