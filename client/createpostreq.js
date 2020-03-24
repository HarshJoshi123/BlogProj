import {isAuthenticated} from "./apiauth"
import {getPosts} from "./"
class NewPost extends Component{
constructor(){
super()
this.state={
title:'',
body:'',
photo:'',
user:{},
Filesize:0,
err:'',
posts:[]
}

}

componentDidMount(){
this.postData=new FormData() //Form object created which fills as we change values in handlechange
this.setState({user:isAuthenticated().user})
}

getposts=()=>{

getPosts().then(result=>{
if(result.error){

	console.log(result.error)
}
else{


this.setState({posts:result}) //we will get all posts here

}

})

}


handlechange=name=>e=>{
const value= name === 'photo' ? e.target.files[0] : e.target.value
const Filesize = name === 'photo' ? e.target.files[0].size : 0
this.postData.set(name,value)


this.setState({[name]:e.target.value})


}

handleclick=()=>{

event.prevenDefault()
if(isValid){

const userId=isAuthenticated().user._id
const token=isAuthenticated().token
createPost(userId,token,this.postData).then(data=>{
	if(data.error){
		console.log(data.error)
	}
	else if(data.err){
		console.log(data.error)
	}
   else{

   this.setState({title:'',body:'',photo:'',Filesize:0})

       }

     }


  }


}


isValid=()=>{
const {title,body,Filesize}=this.state
if(Filesize > 100000){
	this.setState({err:"File should be less than 100kb",loading:false});
	return false;
}
if(title.length===0 || body.length===0){
	this.setState({err:"Body and Title are Required",loading:false})
  return false
}

return true

}

