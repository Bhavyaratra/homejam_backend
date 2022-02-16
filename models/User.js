const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            require: [true, "Please provide a unique username"],
        },
        email:{
            type:String,
            require: [true, "please provide a new email"],
            unique: true,
            match: [
                //regular expression for email
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                , "Please provide a valid email"
            ]
        },
        role:{
            type:String,
            enum: ["student","teacher"],
            require:[true, "role not provided"],
        },
        password:{
            type:String,
            required: [true,"please add a password"],
            minlength: 6, 
            select: false //when query for user, pswrd wont be send unless we explicitly ask or it. 
        },
         classes : [
            {type : mongoose.Schema.Types.ObjectId, ref: "Classes"}
        ]

    },{ timeStamps: true }
);

//runs on new userschema object before saving
userSchema.pre("save", async function(next){
    //true if pswrd is encrypted(modified)
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password,salt);
    next();

})

userSchema.methods.matchPasswords = async function(password){
    //compares password from body to password from user schema that called this method
    return await bcrypt.compare(password,this.password)
}

//generate auth token 
userSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: 60*60})
}


const Users = mongoose.model("Users",userSchema);

module.exports = Users;