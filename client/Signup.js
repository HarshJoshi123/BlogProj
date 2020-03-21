import React,{Component} from 'react'
import {signup} from "../auth/index.js"
import {Link} from "react-router-dom"
class Signup extends Component{
constructor(props){
super(props);
this.state={
email:"",
password:"",
name:"",
err:""
}
this.handlechange=this.handlechange.bind(this);

}
handlechange= name=>e=>{    //for ex onChange={this.handlechange("email")} or ("name")
this.setState({err:""})                    
this.setState({
	[name]:e.target.value
});


}
handleclick=(event)=>{

event.preventDefault();
const {name,email,password}=this.state
const user={
   name:name,
   email:email,
   password:password

}
console.log(user);
signup(user).then(data=>{
	if(data.error){
		this.setState({err:data.error})}
    else if(data.err){
		this.setState({err:data.err})}
     
    else{
    	this.setState({
    		name:"",
    		email:"",
    		password:"",
    		err:""
    	})
    }
})


};



