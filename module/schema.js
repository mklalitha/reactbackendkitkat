const mongoose = require("mongoose");
const data_schema = new mongoose.Schema({
    name:{
        type:String,
      
    },
    email:{
        type:String,
      
    },
    file:{
        type:String,
        

    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    company:{
        type:String,
    },
    phonenumber:{
       type:String,
    }
})
   
module.exports = mongoose.model("DBcollection",data_schema)