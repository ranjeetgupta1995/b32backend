const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../model/user.model');

const userRouter = express.Router();

userRouter.post('/register', async(req, res) => {
    const {name, email, gender, password, age, city} = req.body;
    const newEmail = await userModel.findOne({email});
    if(newEmail){
        return res.send({"msg": "User already exist, please login"})
    }
    try{
        bcrypt.hash(password, 5, async(err, hash) => {
            if(err){
                res.status(200).json({"msg": err})
            }else{
                const newUser = new userModel({
                    name,
                    email,
                    gender,
                    password: hash,
                    age,
                    city
                })
                await newUser.save();
                res.status(200).json({"msg": "new user has been registered", "user": newUser})
            }
        });
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})

userRouter.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.send({"msg": "This user does not exist"})
    }
    try{
        bcrypt.compare(password, user.password, (err, result) => {
            if(result){
                const token = jwt.sign({"userName": user.name, "userId": user._id}, "masai");
                res.status(200).json({"msg": "user login successfully!", "token": token})
            }else{
                res.status(200).json({"msg": "wrong password!!", "error": err})
            }
        });
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})


module.exports = {
    userRouter
}