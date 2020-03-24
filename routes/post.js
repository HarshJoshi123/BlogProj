const {userById} from "../methods/user"
const {postById,createPost,getPosts} from "../methods/post"
const {requireSignin} from "../methods/auth"
const express from 'express'
const router=express.Router()

router.get("/posts",getPosts);
router.post("/post/new/:userId",requiredSignin,createPost);


router.param("userId",userById);
module.exports=router

