// Task data structure model

const mongoose = require("mongoose")
const {Schema} = mongoose

const Task = new Schema({
    title : {type : String , required : true},
    date : {type : Date , default : Date.now()}
})

module.exports = mongoose.model("Task" , Task)

