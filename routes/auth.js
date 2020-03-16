const express=require('express');
const { signup,signin,signout,userSignupValidator }=require('../methods/auth.js');

const router=express.Router();  //router object made to handle routing

router.post("/signup",userSignupValidator,signup);  //**First validator.fn is handled then postcontroller fn
router.post("/signin",signin);                                                                               //if validator fn generates error then postcontroller fn not performed
router.get("/signout",signout); //router.get("/",(req,res)=>{res.send("Laudo");}); //ALSO WORKS

//any route containing :userID,first userById function is executed   
module.exports=router;