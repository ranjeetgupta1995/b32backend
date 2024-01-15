const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { blacklistModel } = require('./model/blacklist.model');
const { userRouter } = require('./routes/user.routes');
const { postRouter } = require('./routes/post.routes');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Home Page</h1>")
})


//for logged out
app.get("/logout", async(req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    try{
        const newBlacklist = new blacklistModel({"blacklist": token});
        await newBlacklist.save();
        res.status(200).json({"msg": "user has been logout!"})
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})

//for user router
app.use("/users", userRouter);


//for post router
app.use("/posts", postRouter)


app.listen(process.env.port, async() => {
    try{
        await connection;
        console.log("server connected to db");
        console.log("Server is running at port"+" "+process.env.port)
    }
    catch(err){
        console.log(err)
    }
})