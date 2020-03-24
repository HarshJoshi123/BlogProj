

export const createPost=(userId,token,post)=>{

return fetch(`http://localhost:8080/post/new/${userId}`,{

method:"POST",
header:{
  Accept:"application/json",
  Authorization:`Bearer ${token}`
},
body:post //send without stringify

}).then(response=>{
return response.json()

}).catch(err=>{
	console.log(err)
})


}

export const getPosts=()=>{

return fetch(`http://localhost:8080/posts`,{

method:"GET",

}).then(response=>{
	return response.json()
}).catch(err=>{
	console.log(err);
})


}