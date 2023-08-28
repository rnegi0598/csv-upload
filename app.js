const express=require('express');
const bodyParser=require('body-parser');
const indexRouter=require('./routes/index');
const dbConnect =require('./config/db');
const app=express();


dbConnect();
app.set('view engine' ,'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'))

app.use('/',indexRouter);


app.listen(5173);