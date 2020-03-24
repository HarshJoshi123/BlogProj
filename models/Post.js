const mongoose=require('mongoose');
//Design basic schema of attributes(title and body) of json to be stored  
const {ObjectId}=mongoose.Schema
const postSchema=new mongoose.Schema({
	title:{
		type:String,
		required:"Title is Required",
		
	},
	body:{
		type:String,
		required:"Body is required",
		},
	photo:{
		data:Buffer,        
	   contenType:String
	},	
	postedBy:{
		type:ObjectId,         
		ref:"User"             
	},
	created:{
		type:Date,
		default:Date.now
	},
	updated:Date,
	likes: [{type:ObjectId,ref:"User"}], 
    comments:[{
    	text:String,
    	created: { type:Date,default:Date.now()},
    	postedBy: { type:ObjectId,ref:"User"}	
    }]   //array of comment is comments ,comment will have 3 subpart text,postedBy and created
});          
module.exports=mongoose.model("Post",postSchema); 