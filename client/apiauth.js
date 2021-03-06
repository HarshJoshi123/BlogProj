export const signout=(next)=>{
 //next fn is passed as argument which redirects user
 
 if(typeof window!==undefined){
 	localStorage.removeItem("jwt")  //Remove token
 }
 next();
 console.log("laude");
 return fetch(`${process.env.REACT_APP_API_URL}/signout`,{
 	method:"GET"
 }).then(response=>{
console.log('signout',response)
return response.json()
 }).catch(err=>{
 	console.log(err);
 })


}


export const isAuthenticated=()=>{
if(typeof window=="undefined"){
  return false;
}
if(localStorage.getItem("jwt")){

  return JSON.parse(localStorage.getItem("jwt"));
}
else{
   console.log("Authenticate mai dikkat")

  return false
}

}

export const authenticate=(jwt,next)=>{
if(typeof window!=="undefined"){   
  localStorage.setItem("jwt",JSON.stringify(jwt)); 
  next();
}


}

export const signin=user=>{
	
  return fetch(`http://localhost:8080/signin`,{            //Return fetch is imp.
  method:"POST",
  headers:{
  	Accept:"application/json",
  	"Content-type":"application/json"
  },
  body:JSON.stringify(user)

}).then(response=>{
	
  return response.json();
	
}).catch(err=> console.log("errooooorr"))

}

export const signup=user=>{
	return fetch(`http://localhost:8080/signup`,{            //Return fetch is imp.
  method:"POST",
  headers:{
  	Accept:"application/json",
  	"Content-type":"application/json"
  },
  body:JSON.stringify(user)

}).then(response=>{
	return response.json();
	
}).catch(err=>console.log('Bhenkelode'))

}