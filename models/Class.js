const mongoose = require("mongoose")

const ClassesSchema = new mongoose.Schema({
    subject : {
        type : String,
        required : true,
        trim : true,
        min : 3
    },
    description: { type: String, required: true, trim: true },
    students : [
        {type: mongoose.Schema.Types.ObjectId, ref: "Users"}
    ],
    createdBy :  {
        type: mongoose.Schema.Types.ObjectId, ref: "Users" ,
        required : true,
    }
},{timeStamps : true})

module.exports = mongoose.model("Classes",ClassesSchema)