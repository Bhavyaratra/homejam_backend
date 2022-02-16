const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async function(req,res,next){
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        //*example: "Bearer bhj342b34n2b3k4b23j4n...."
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){ //401: unauthorized
        return res.status(401).json({
            success : false,
            error : "unauthorized token"
        })
    }

    try{
        
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
     
        const user = await User.findById(decoded.id)

        if(!user){
            return res.status(401).json({
                success : false,
                error : "No user found"
            })
        }
     
        req.user = user;
        next();

    }catch(err){
        return res.status(401).json({
            success : false,
            message : "Not authorized to access"
     
        })
    }

}