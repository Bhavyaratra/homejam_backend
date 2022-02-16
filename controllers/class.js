
const Classes = require("../models/Class")
const Users = require("../models/User")

exports.createClass =async (req,res) =>
{
    const {subject,description} = req.body;
    const id = req.user._id;
   
    if(req.user.role==="student"){
        return res.status(401).json({success: false , message : "not authorized to create a class"})
    }

    try{
        const newClass = new Classes({
            subject,
            description,
            createdBy : id
        })
        console.log(newClass);
        const saveClass = await newClass.save();
        console.log(saveClass);
        if(saveClass){
            const updateUserRes = await Users.findOneAndUpdate({_id : id}, {"$push":{classes : newClass._id}})
            console.log(updateUserRes)
            return res.status(201).json({message : "Class is created Successfully", data :newClass});
        }
    
    }catch(error){
        return res.status(400).json({success: false , message : "Class is not created",error : error});
    }
}

exports.getClass =async (req,res) =>
{
    const classes = req.user.classes;
    console.log(classes);
    if(classes.length===0){
        return res.status(400).json({success: false , message : "No Classes Found"});
    }
    try{
        let data=[];
        for(let i=0; i<classes.length; i++){
            const classData = await Classes.findById(classes[i])
            if(classData) data.push(classData);
        }
        res.status(201).json({success: true ,data});
    }catch(error){
       return res.status(400).json({success: false , message : "Class Not Found",error : error});
    }
}

exports.deleteClass =async (req,res) =>
{
    const classId = req.body.classId;
    const role = req.user.role;
    const userId = req.user.id;
    try{
        if(role==="teacher"){
           const classData = await Classes.findById(classId);

           if(classData!==null && classData.createdBy==userId){
            const students = classData.students;
            const updateUserRes = await Users.findByIdAndUpdate(userId, {"$pull":{classes : classId}})
            const deleteClassRes = await Classes.findByIdAndDelete(classId); 
            for(let i=0;i<students.length;i++){
                const updateStudentRes = await Users.findByIdAndUpdate(students[i], {"$pull":{classes : classId}})
            }
            return res.status(201).json({success: true,message : "class deleted"});
           }else{
            return res.status(400).json({success: false , message : "Class Not Found",error : error});
           }
        }else{
            return  res.status(401).json({success: false , message : "unauthorized"})
        }
       
    }catch(error){
       return res.status(400).json({success: false , message : "Class Not Found",error : error});
    }
}

exports.updateClass =async (req,res) =>
{
    const {classId, subject,description} = req.body;
    const id = req.user._id;
   
    if(req.user.role==="student"){
        return res.status(401).json({success: false , message : "not authorized to create a class"})
    }

    try{
        const updateClassRes = await Classes.findByIdAndUpdate(classId, { subject,description })
        return res.status(201).json({success:true, message : "Class is updated Successfully"});
       
    }catch(error){
        return res.status(400).json({success: false , message : "Class is not updated",error : error});
    }
}

exports.addStudent = async (req,res) =>
{
    const {classId, studentId } = req.body;
    const id = req.user._id;

    if(req.user.role==="student"){
        return res.status(401).json({success: false , message : "not authorized to create a class"})
    }

    try{
        const getClass = await Classes.findById(classId);
        if(!getClass) return res.status(400).json({success: false});
        console.log(getClass,id)
        if(id==getClass.createdBy.toString()){
            const updateStudentRes = await Users.findByIdAndUpdate(studentId,{"$addToSet":{classes: classId}});
            if(!updateStudentRes) return res.status(400).json({success: false});
            const updateClassRes = await Classes.findByIdAndUpdate(classId,{"$addToSet":{students:studentId}});
            return res.status(201).json({success:true, message : "added student"});
        }else{
            return res.status(401).json({success: false,message:"unauthorized"})
        }
       
    }catch(error){
        return res.status(400).json({success: false , message : "couldn't add student",error : error});
    }
}


exports.removeStudent = async (req,res) =>
{
    const {classId, studentId } = req.body;
    const id = req.user._id;

    if(req.user.role==="student"){
        return res.status(401).json({success: false , message : "not authorized to remove a class"})
    }

    try{
        const getClass = await Classes.findById(classId);
        if(!getClass) return res.status(400).json({success: false});
        console.log(getClass,id)
        if(id==getClass.createdBy.toString()){
            const updateStudentRes = await Users.findByIdAndUpdate(studentId,{"$pull":{classes: classId}});
            if(!updateStudentRes) return res.status(400).json({success: false});
            const updateClassRes = await Classes.findByIdAndUpdate(classId,{"$pull":{students:studentId}});
            return res.status(201).json({success:true, message : "removed student"});
        }else{
            return res.status(401).json({success: false,message:"unauthorized"})
        }
       
    }catch(error){
        return res.status(400).json({success: false , message : "couldn't remove student due to some error",error : error});
    }
}
