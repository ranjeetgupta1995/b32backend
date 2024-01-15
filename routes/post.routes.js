const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { postModel } = require('../model/post.model');

const postRouter = express.Router();
postRouter.use(auth);

postRouter.post("/add", async(req, res) => {
    try{
        const newPost = new postModel(req.body);
        await newPost.save();
        res.status(200).json({"msg": "new post has been updated", "newPost": newPost})
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})

postRouter.get("/", async(req, res) => {
    try{
        const allPost = await postModel.find({userName: req.body.userName});
        res.status(200).json({allPost})
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})

postRouter.get("/top", async(req, res) => {
    try{
        const allPost = await postModel.find({userName: req.body.userName});
        res.status(200).json({allPost})
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})

postRouter.patch("/update/:id", async(req, res) => {
    const id = req.params.id;
    const data = await postModel.findOne({_id: id});
    if(!data){
        return res.send("this data not available!")
    }
    try{
        if(data.userName == req.body.userName){
            await postModel.findByIdAndUpdate({_id: id}, req.body)
            res.status(200).json({"msg": "data has been updated"})
        }else{
            res.status(200).json({"msg": "you are not authorized to update this data"})
        }
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})

postRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;
    const data = await postModel.findOne({_id: id});
    if(!data){
        return res.send("this data not available!")
    }
    try{
        if(data.userName == req.body.userName){
            await postModel.findByIdAndDelete({_id: id})
            res.status(200).json({"msg": "data has been deleted"})
        }else{
            res.status(200).json({"msg": "you are not authorized to update this data"})
        }
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})

module.exports = {
    postRouter
}