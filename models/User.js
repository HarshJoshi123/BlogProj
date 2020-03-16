const mongoose=require('mongoose');
const uuidv1= require('uuid/v1');
const crypto=require('crypto');
const {ObjectId}=mongoose.Schema
const userSchema=new mongoose.Schema({

 name:{
    type:String,
    trim:true,
    required:true
 },
 email:{
 	type:String,
 	trim:true,
 	required:true
 },
 hashed_password:{
 	type:String,
 	required:true
 },
 salt:String,
 created:{
 	type:Date,
 	default:Date.now
 },
 updated:Date,
 photo:{
  data:Buffer,
  contentType:String
 },
 about:{
  type:String,
  trim:true
 },
 followers: [{type:ObjectId,ref:"User"}],
 following: [{type:ObjectId,ref:"User"}],
 resetPasswordLink: {
        data: String,
        default: ""
    }
});    

userSchema
.virtual('password')                // this fn runs automatically when user object is created
.set(function(password){
    
    this._password=password; //temporary var _password
    this.salt=uuidv1();    //generate random code
    this.hashed_password=this.encryptPassword(password) ;//encryptpassword method of schema hence this. is used
})
.get(function(){
    return this._password;
});


userSchema.methods = {      //these methods used with model objects

          authenticate: function(plainText){
 
  return this.encryptPassword(plainText)===this.hashed_password //We will encrypt password entered by user and compare with actual password of user
   },
      encryptPassword:function(password){  //Schema can store functions as well
        
                if(!password){
                    return "hhhhhhh";
                }
                try{ //console.log(this.salt); 
                    //console.log("BROO");
                   return  crypto.createHmac('sha1',this.salt) 
                            .update(password)
                            .digest("hex"); //sha1 is method of enc,this.salt is code,hex is hexadecimal
                                   //result is encrypted password stored in hashed_password attribute
                }
                catch(err){
                    console.log(err);
                	return "" ;
                }
	

}};
module.exports=mongoose.model("User",userSchema);
