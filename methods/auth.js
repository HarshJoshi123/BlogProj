const User= require("../models/user.js");
const jwt=require("jsonwebtoken");
const expressJwt=require('express-jwt'); //For protecting routes 
require('dotenv').config()  //To import variable from .env file which is used for genrating token
exports.signup=async (req,res)=>{
	try{const userExists=await User.findOne({email:req.body.email}) ;//Email will be sent in request 
	if(userExists)                                              //findone() method searches for that one document that matches given criteria
		return res.status(403).json({error:"Email is taken"});

	
const user=await new User(req.body);
await user.save();
res.status(200).json({
	user });

    }              //res to console of server
	 catch(err){
		console.log(err);
	            } 
}
exports.signin=(req,res)=>{       //Invoked when user is trying to login
	//Find user based on email
const {email,password}=req.body
User.findOne({email},(err,user)=>{
//error if user has no email
	if(err || !user){
		return res.status(401).json({
			err:"User with that email doesnt exist"
		})
	}//if user exists,authenticate
	//Generate encrypted password again and compare with stored encrypted password

if(!user.authenticate(password)){
	console.log(password);
	return res.status(401).json({
		error:"Email and password didnt match"
	})
}		



const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);

res.cookie("t",token,{expire:new Date()+9999});

const {_id,name,email}=user
return res.json({token,user:{_id,email,name}});
}) 

	
}
exports.signout=(req,res)=>{
	console.log("Mc");
	res.clearCookie("t");
	return res.json({message:"SignOut Success"});
}

exports.requireSignin=expressJwt({
	secret:process.env.JWT_SECRET,
	userProperty:"auth"
}) 

exports.userSignupValidator=(req,res,next)=>{

req.check("name","Name is required").notEmpty()
req.check("name","Name should be between 3 to 30").isLength({
	min:3,max:30
})

//Email
req.check("email","Email must be between 3 to 32 char")
.matches(/.+\@.+\..+/)                        //Email should have a @ symbol and .com
.withMessage("Email should contain @")                 
.isLength({
	min:3,max:30
}) 
req.check("password","Password cant be empty").notEmpty()
req.check("password")
.isLength({min:6})
.withMessage("Password Should be greater than 6 characters")
.matches(/\d/)
.withMessage("Password Should contain digit ")

const errors=req.validationErrors();
if(errors){
const FirstError=errors.map(error=>error.msg)[0]
return res.status(400).json({err:FirstError})
} 

next();
}   