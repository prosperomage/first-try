import { Router } from "express";
import {
  CreatePost,
  DeletePost,
  GetAllPosts,
  GetOnePost,
  UpdatePost,
} from "../controllers/post.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/posts/create:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               content:
 *                 type: string
 *                 example: This is my content
 *               author:
 *                 type: string
 *                 example: Jehosaphat
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.route("/create").post(CreatePost);


/**
 * @swagger
 * /api/v1/posts/GetPosts:
 *   get:
 *     summary: gets  a post
 *     description: Returns an array of user objects.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.route("/GetPosts").get(GetAllPosts);


/**
 * @swagger
 * /api/v1/posts/GetOnePost/{id}:
 *   get:
 *     summary: create a post
 *     description: Returns an array of user objects.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.route("/GetOnePost/:id").get(GetOnePost);


/**
 * @swagger
 * /api/v1/posts/UpdatePosts/{id}:
 *   patch:
 *     summary: updates  a post
 *     description: it will return posts with its updated values.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.route("/UpdatePosts/:id").patch(UpdatePost);


/**
 * @swagger
 * /api/v1/posts/delete/{id}:
 *   delete:
 *     summary: delete a post
 *     description: Returns an array of user objects.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.route("/delete/:id").delete(DeletePost);

export default router;
