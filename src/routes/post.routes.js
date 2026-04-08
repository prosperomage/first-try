import { Router } from "express";
import { CreatePost, DeletePost, GetAllPosts, GetOnePost, UpdatePost } from "../controllers/post.controller.js";

const router  = Router();


router.route('/create').post(CreatePost)
router.route('/GetPosts').get(GetAllPosts)
router.route('/GetOnePost/:id').get(GetOnePost)

// we need the id of the post so we can update it
router.route('/UpdatePosts/:id').patch(UpdatePost)

router.route('/delete/:id').delete(DeletePost)


export default router 