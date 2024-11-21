const jwt=require('jsonwebtoken');
const { jwt_secret_user } = require('../config');


function userMiddlware(req,res,next){
const token=req.headers.token;
const decoded=jwt.verify(token, jwt_secret_user);

if(decoded)
{
    req.userId=decoded.id;
    next();
}
else{
    res.status(403).json({
        message:"You are not signed in"
    })
}
}


module.exports={
    userMiddlware:userMiddlware
}