const User = require('../models/User')

const sendToken = (user,statusCode,res)=>{
    const token = user.getSignedToken();
    const { username, email,role} = user
    res.status(statusCode).json({
        success: true,
        token,
        user : {id:user._id,
            username, 
            email,role
        }
    })
}

exports.register = async (req,res) =>{
    const {username,email,password,role} = req.body;

    try{
        //async function creating new user in db
        const newUser = await User.create({
            username,email,password,role
        });
        if(newUser){
            res.status(200).json({
                success: true,
                message : "user is created"
            })
        }

    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
        });
     
    }
};

exports.login =async (req,res) =>{
    const{email,password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({
            success:false,
            error: "please provide email and password"
        })
    }

    try{                                           //explicitly asking for pswrd with(+) email
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(404).json({
                success: false,
                error: "Invalid Credentials"
            })
        }
                                //takes password from body
        const isMatch =  await user.matchPasswords(password)
        
        if(!isMatch){
            return res.status(404).json({
                success: false,
                error:"Invalid Credentials"
            });
        }else{
            sendToken(user,200,res);
        }

    }catch(err){
    
        res.status(500).json({
            success: false,
            error: err.message
        });
    };

};
