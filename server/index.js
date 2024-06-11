// run the server here
const express = require("express");
const app = express()
const http = require ("http");
const cors = require("cors");
const { Server } = require("socket.io");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:radaradmin@cs110-radar.eiyen8d.mongodb.net/?retryWrites=true&w=majority&appName=cs110-radar";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


app.use(cors());
const server = http.createServer(app); // create the express server



server.listen(8080, () => {
    console.log("server listening on port 8080");
});

// https://stackoverflow.com/questions/70233559/nodejs-express-and-socket-io-same-port-integration
const io = new Server(server
    , {
    cors: {
        origin: "http://localhost:3000", // specify that server will be communicating with this address (client)
        methods: ["GET", "POST"],
    }
}); // pass the express server to websocket

try {
    client.connect();
}
catch {
    console.log("Error: Could not connect to MongoDB");
}
finally {
    console.log("Connected to MongoDB");
}


app.get("/lobbies", async (req, res) => {
    try {
        // await client.connect();
        const db = client.db("radar");
        const lobbies = db.collection("lobbies");
        const result = await lobbies.find().toArray();
        // const result = await lobbies.find();
        res.json(result);
    }
    catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Internal server error" });
    }
    // finally {
    //     await client.close();
    // }
});

app.get("/lobbies/:id", async (req, res) => {
    try {
        const db = client.db("radar");
        const lobbies = db.collection("lobbies");
        const result = await lobbies.findOne({id: req.params.id});
        res.json(result);
    }
    catch (error) { 
        console.log("Error: " + error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// get user info by uid
app.get("/users/:uid", async (req, res) => {
    try {
        const db = client.db("radar");
        const users = db.collection("users");
        const result = await users.findOne({uid: req.params.uid}, {_id:0, name:1, email:1, uid:1, nickname:1});
        res.json(result);
        console.log("sent user info for uid ", req.params.uid);
    }
    catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/messages/:id", async (req, res) => {
    // if (req.params.id == '1') {
    // }
    try {
        const db = client.db("radar");
        const messages = db.collection("messages");
        // const result = await messages.find({lobby_id: req.params.id});
        const result = await messages.find({lobby_id:req.params.id}, {_id:0}).toArray();
        res.json(result);
        // console.log("sent messages to lobby w/ id ", req.params.id);
        // console.log("Messages: ", JSON.stringify(result));
    }
    catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// io is the server, socket is the client websocket, each reference to "socket" can be thought of as speaking to the client which invoked it
// socket.io emits events, then listens, waiting for a response from client
// all server behavior happens here
// server behavior activates on client connection
io.on("connection", (socket) => { // => is a function expression, (parameter passed in), => returns...
    // on client connection, socket will do...
    console.log("user connected: ", socket.id); // anyone who joins the server is assigned a unique ID

    socket.on("disconnect", () => {
        console.log("user disconnected: ", socket.id);
    });

    socket.on("user_login", async (username, email, uid) => {
        console.log("user login:");
        try {
            const db = client.db("radar");
            const users = db.collection("users");
            var checkUser = await users.findOne({uid: uid});
            if (!checkUser) {
                console.log("user ", username, " not found, creating new user...");
                const user = {name: username, email: email, uid: uid, nickname: username}; // nickname defaults to gh displayname
                const newUser = await users.insertOne(user);
            }
            else { // user already exists
                console.log("user ", username, " w/ uid (", uid, ") found!");
            }
        }  
        catch (error) {
            console.log("Error: " + error);
        }
    });

    socket.on("update_nickname", async (nickname, uid) => {
        console.log("user ", uid, " updating nickname to ", nickname);
        try {
            const db = client.db("radar");
            const users = db.collection("users");
            const result = await users.updateOne({uid: uid}, {$set: {nickname: nickname}});
        }
        catch (error) {
            console.log("Error: " + error);
        }
    });


    socket.on("create_lobby", async (lobby_name, lobby_game, owner_uid) => {
        // client.connect();
        try {
            const db = client.db("radar");
            const lobbies = db.collection("lobbies");
            // pass a unique lobby_id to the DB
            const lobby_id = (+new Date * Math.random()).toString(36).substring(0,6);
            const lobby = { name: lobby_name, game: lobby_game, id: lobby_id, owner_uid: owner_uid};
            const result = await lobbies.insertOne(lobby);
            // client.close();
            console.log("lobby created: " + lobby_name + ", " + lobby_game + ", " + lobby_id, " by ", owner_uid);
        }
        catch (error) {
            console.log("Error: " + error);
        }
    });

    socket.on("close_lobby", async (lobby_id) => {
        try {
            const db = client.db("radar");
            const lobbies = db.collection("lobbies");
            const result = await lobbies.deleteOne({id: lobby_id});
            console.log("lobby ", lobby_id, " closed");
        }
        catch (error) {
            console.log("Error: " + error);
        }
    });

    socket.on("join_chat", async (lobby_id, uid) => {
        socket.join(lobby_id);
        try {
            const db = client.db("radar");
            const lobbies = db.collection("lobbies");
            // check if the member is on the member list, if not, add them
            const checkMember = await lobbies.findOne({id: lobby_id, members: uid}); // does members contain the user with uid?
            if (!checkMember) {
                const result = await lobbies.updateOne({id: lobby_id}, {$addToSet: {members: uid}});
                console.log("added user with uid ", uid, " to lobby ", lobby_id);
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        console.log("user with uid ", uid, " joined chat on lobby ", lobby_id);
    });
    
    // when a message is sent, update the database
        // client should re-render on DB update
        // lobby_id should be a string of form: "chat1"
        // make sure it's actually passed in as a string...
    socket.on("send_message", async (message, lobby_id) => {
        try {
            const db = client.db("radar");
            const messages = db.collection("messages");
            const msg = {content: message.content, author: message.author, timeStamp: message.timeStamp, lobby_id: lobby_id, author_uid: message.author_uid};
            const result = await messages.insertOne(msg);
            // not used in Chat.tsx for now, but will be useful for synchronizing db requests from client
            socket.to(lobby_id).emit("recieve_message", message); // on recieved message, clients should fetch the latest messages from the DB
            // console.log("(", socket.id, "): ", message.author, " says : \"", message.content, " \" to ", lobby_id, " at ", message.timeStamp);
            console.log(message.author, " says : \"", message.content, " \" to ", lobby_id, " at ", message.timeStamp);
        }
        catch (error) {
            console.log("Error: " + error);
        }
    });
});

// will disconnect when the process is terminated
process.on("SIGINT", () => {
    client.close();
    console.log("Closed connection to MongoDB");
    process.exit();
});