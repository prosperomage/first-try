// import { Post } from "../models/post.model.js";

// //crud functionality goes here

//import {prisma} from "../lib/prisma.js"


// //CREATE POST
// const CreatePost = async (req, res) => {
//   //get the body of the post
//   try {
//     const { name, description, age } = req.body;
//     if (!name) {
//       return res.status(400).json({ message: "name field is required" });
//     }
//     const post = await Post.create({ name, description, age });
//     res.status(201).json({ message: "post created successfully", post });
//   } catch (error) {
//     res.status(500).json({ message: "internal server error" });
//   }
// };


// //GET POST
// const GetAllPosts = async (req, res) => {
//   try {
//     // get all the posts and store it in the var called findPost
//     const findPost = await Post.find();
//     res.status(200).json(findPost);
//   } catch (error) {
//     res.status(500).json({ message: "internal server error", error });
//   }
// };

// // get one post, i wrote this myself
// const GetOnePost = async (req, res) => {
// try {
//   const findOnePost = await Post.findById(req.params.id)
//    if (!findOnePost) return res.status(404).json({ message: "post not found" });
//   res.status(200).json(findOnePost);
// } catch (error) {
//     res.status(500).json({ message: "internal server error", error });
// }
// }

// // update post
// const UpdatePost = async (req, res) => {
//   try {
//     //check if the body is empty
//     //{name:x ,description: y, age:z} =>
//     if (Object.keys(req.body).length === 0) {
//       res.status(400).json({ message: "no data provided for update" });
//     }

//     const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!post) return res.status(401).json({ message: "post not found" });

//     res.status(200).json({ message: "post has been updated", post });
//   } catch (error) {
//     res.status(500).json({ message: "internal server ERROR", error });
//   }
// };

// //DELETE POST
// const DeletePost = async (req, res) => {
//   try {
//     const deleted = await Post.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "post not deleted" });

//     res.status(200).json({ message: "post has been deleted", deleted });
//   } catch (error) {
//     res.status(500).json({ message: "internal server ERROR", error });
//   }
// };

// export { CreatePost, GetAllPosts, GetOnePost, UpdatePost, DeletePost };




