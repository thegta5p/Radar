const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB URI and client setup
const uri = "mongodb+srv://admin:radaradmin@cs110-radar.eiyen8d.mongodb.net/?retryWrites=true&w=majority&appName=cs110-radar";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const app = express();
app.use(cors());
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

// Connect to MongoDB
client.connect()
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error: Could not connect to MongoDB", err));

// Server and socket.io handlers
server.listen(8080, () => {
    console.log("server listening on port 8080");
});

// Express routes
app.get("/lobbies", async (req, res) => {
    try {
        const db = client.db("radar");
        const lobbies = db.collection("lobbies");
        const result = await lobbies.find().toArray();
        res.json(result);
    } catch (error) {
        console.error("Error retrieving lobbies: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/user/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        const db = client.db("radar");
        const users = db.collection("users");
        const user = await users.findOne({ uid: uid });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ username: user.name, email: user.email });
    } catch (error) {
        console.error(`Error fetching user: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/messages/:id", async (req, res) => {
    try {
        const db = client.db("radar");
        const messages = db.collection("messages");
        const result = await messages.find({ lobby_id: req.params.id }, { _id: 0 }).toArray();
        res.json(result);
    } catch (error) {
        console.error("Error fetching messages: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Socket.io events
io.on("connection", (socket) => {
    console.log("user connected: ", socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected: ", socket.id);
    });

    socket.on("user_login", async (username, email, uid) => {
        try {
            const db = client.db("radar");
            const users = db.collection("users");
            const checkUser = await users.findOne({ uid: uid });
            if (!checkUser) {
                console.log(`Creating new user: ${username}`);
                await users.insertOne({ name: username, email: email, uid: uid, nickname: username });
            } else {
                console.log(`User found: ${username}`);
            }
        } catch (error) {
            console.error("Error during user login: ", error);
        }
    });

    socket.on("update_nickname", async (nickname, uid) => {
        try {
            const db = client.db("radar");
            await db.collection("users").updateOne({ uid: uid }, { $set: { nickname: nickname } });
        } catch (error) {
            console.error("Error updating nickname: ", error);
        }
    });

    socket.on("create_lobby", async (lobby_name, lobby_game) => {
        try {
            const db = client.db("radar");
            const lobby_id = (+new Date * Math.random()).toString(36).substring(0, 6);
            await db.collection("lobbies").insertOne({ name: lobby_name, game: lobby_game, id: lobby_id });
            console.log(`Lobby created: ${lobby_name} with ID ${lobby_id}`);
        } catch (error) {
            console.error("Error creating lobby: ", error);
        }
    });

    socket.on("join_chat", (username, lobby_id) => {
        socket.join(lobby_id);
        console.log(`${username} joined chat on lobby ${lobby_id}`);
    });

    socket.on("send_message", async (message, lobby_id) => {
        try {
            const db = client.db("radar");
            await db.collection("messages").insertOne({ ...message, lobby_id: lobby_id });
            socket.to(lobby_id).emit("receive_message", message);
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    });
});

// Handle SIGINT for graceful shutdown
process.on("SIGINT", () => {
    client.close().then(() => {
        console.log("Closed connection to MongoDB");
        process.exit();
    });
});
