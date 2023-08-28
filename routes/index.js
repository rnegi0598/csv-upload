const express= require('express');
const multer=require('multer');
const {index,uploadCSV,displayCSV,deleteCSV}=require('../controllers/index');

const router=express.Router();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/uploads');
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    }
})

const fileFilter=(req,file,cb)=>{
   

    if(file.mimetype==='text/csv'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload=multer({storage:storage,fileFilter:fileFilter});

router.get('/',index);

router.post('/upload-file-csv',upload.single('CSVfileUpload'),uploadCSV)

router.get('/csv-data/:id',displayCSV);

router.get('/delete/:id',deleteCSV);

module.exports=router;