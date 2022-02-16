const Classes = require("../models/Class")
const Users = require("../models/User")

exports.getClass =async (req,res) =>{
    const classes = req.user.classes;
    
    if(classes.length===0){
        return res.status(400).json({success: false , message : "No Classes Found"});
    }
    try{
        let data=[];
        for(let i=0; i<classes.length; i++){
            const classData = await Classes.findById(classes[i]).populate('createdBy');
            if(classData) data.push(classData);
        }
        res.status(201).json({success: true ,data});
    }catch(error){
       return res.status(400).json({success: false , message : "Class Not Found",error : error});
    }
}