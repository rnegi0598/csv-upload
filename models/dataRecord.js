const mongoose=require('mongoose');


const csvSchema=new mongoose.Schema({
    originalname:{
        type:String,
        required:true,
    },
    path:{
        type:String,
        required:true,
    },


});



module.exports=mongoose.model('CsvRecord',csvSchema);