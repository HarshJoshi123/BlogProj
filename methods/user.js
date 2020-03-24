const User=require("../models/User")


exports.userById=(req,res,next,id)=>{
User.findById(id).populate("followers","_id name").populate("following","_id name")
.exec((err,user)=>{
if(err || !user){
	return res.status(400).json({
		err:"error"
	})
}
else{

req.profile=user;

next(); 

}

})



}