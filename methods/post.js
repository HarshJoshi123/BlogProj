const Post=require("../models/Post")
const formidable=require('formidable')
const fs=require('fs')


exports.getPosts=(req,res,next)=>{

Post.find().populate("postedBy","_id name").populate("comments.postedBy","_id name ").select("_id title body created likes ").sort({created:-1})
.then(posts=>{
	res.json(posts)
}).catch(err=>{
	console.log(err)
})



}

exports.createPost=(req,res,next)=>{

	let form=formidable.IncomingForm()
     form.keepExtensions=true;
     form.parse(req,(error,fields,files)=>{

        if(error){
        	res.status(400).json({
        		message:"error"
        	})
        }
        else{

       let post=new Post(fields);
       post.postedBy=req.profile
       if(files.photo){
            post.photo.data=fs.readFileSync(files.photo.path)
            post.photo.contentType=files.photo.type

       }

     post.save((err,res)=>{
  if(err){
  	res.json({err:err})
  }
  
   res.json({res})

  
     })


        }



     })
}