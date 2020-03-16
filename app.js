const express=require('express');
const app=express();
const morgan=require("morgan");
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const expressValidator=require('express-validator')
const cookieparser=require('cookie-parser')
const authRoutes=require('./routes/auth.js');
dotenv.config();

app.use(express.json()); //Deal with incoming request as object and recognizes it as Json which is readable by nodejs 
const port=process.env.PORT || 8080;
const uri=process.env.MONGO_URI;
mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex: true});
const connection=mongoose.connection;
connection.once('open',()=>{
	console.log("hogya yipee");
})

app.use(morgan("dev"));  //middleware which tracks request to server 
app.use(express.json()); //Deal with incoming request as object and recognizes it as Json which is readable by nodejs 
                           
app.use(expressValidator()); //used to check schema -- for validators/index.js functions which has middleware fn 
app.use(cookieparser()); 
app.use('/',authRoutes); 
                 
app.listen(port,()=>{
	console.log(`Listening at port :${port}`);   //Node Api listening at port 8080
});