import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import app from './src/app.js'

dotenv.config({
    path: './.env'
})


const startServer  = async ()=> {
    try {
        await connectDB();
        app.on('error', (error)=> {
            console.log('error', error)
            throw error
        })
        app.listen(process.env.PORT )
    } catch (error) {
        console.log('mongodb connection failed', error)
    }
}


startServer();