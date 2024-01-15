const { blacklistModel } = require("../model/blacklist.model");
const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const newToken = await blacklistModel.findOne({"blacklist": token});
    if(newToken){
        return res.send("Please login again!")
    }
    try{
        jwt.verify(token, "masai", (err, decoded) => {
            if(decoded){
                req.body.userName = decoded.userName;
                req.body.userId = decoded.userId;
                next();
            }else{
                res.send({"error": err})
            }
        })
    }
    catch(err){
        res.send({"error": err})
    }
}

module.exports = {
    auth
}