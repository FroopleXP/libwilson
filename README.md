# Wilson Messenger

This is an experimental project used to show case an idea I had for a massively scalable messaging application.

## Events (WIP)

Wilson is based on events sent over a websocket in JSON to the server.

## Client Events
```shell
{
    action: 'AUTHENTICATE_USER',
    payload: {
        username: "user",
        password: "password"
    }
}
```

## Server Events
```shell
{
    action: 'WELCOME',
    payload: {
        server_name: "Obi Wan"
    }
}
```