import React,{Component} from "react"
import {signin,signout} from "./apiauth.js"
//<button onClick={()=>signout(()=>history.push('/'))} > SIGNOUT </span> to implement signout and redirect to /    


class Signin extends Component{
constructor(props){
super(props);
this.state={
email:"",
password:"",
err:"",
open:false,
redirecttoHome:false,
loading:false
}
this.handlechange=this.handlechange.bind(this);

}

handlechange= name=>e=>{    
this.setState({err:""})
this.setState({
	[name]:e.target.value   // for ex. onChange={this.handlechange("email")}  
});


}


handleclick=(event)=>{

event.preventDefault();
const {email,password}=this.state
this.setState({
  loading:true
})
const user={
   email:email,
   password:password
}

signin(user).then(data=>{
	if(data.error){
		this.setState({err:data.error,open:false,loading:false})}
    else if(data.err){
		this.setState({err:data.err,open:false,loading:false})}
     
    else{
    	authenticate(data,()=>{
        this.setState({
          redirect:true,
          loading:false
        })
      })  //authenticate fn takes two argument,data and a function

      }
})


};
authenticate(jwt,next){
if(typeof window!=="undefined"){   //to check if headers are loaded
  localStorage.setItem("jwt",JSON.stringify(jwt));  //response is stored in cookies which is a token and user
  next(); //argument fn is called
}


}

render(){

if(this.state.redirecttoHome){
  return <Redirect to={Home} />
}

}
