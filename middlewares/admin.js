const jwt=require('jsonwebtoken');
const { jwt_secret_admin } = require('../config');


function adminMiddlware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token, jwt_secret_admin);
    
    if(decoded)
    {
        req.adminId=decoded.id;
        next();
    }
    else{
        res.status(403).json({
            message:"You are not signed in"
        })
    }
    }
    
    
    module.exports={
        adminMiddlware:adminMiddlware
    }