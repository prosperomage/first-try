import express from "express";

const app = express()  //create an express app


//we parse the  json req we get from the users
app.use(express.json())



//routes will be here
import userRouter from './routes/user.routes.js'
import PostRouter from './routes/post.routes.js'


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", PostRouter) 


//example route http://localhost:4000/api/v1/users/register



export default app