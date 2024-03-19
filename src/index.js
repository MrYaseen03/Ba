// require('dotenv').config({path:'./env'})
import  dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is runnig at port :${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MONGO DB connection Failed !!!", error);
})









/*
import exppress from "express"
const  app = exppress()

( async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("Error",(error)=>{
            console.log("Error",error)
            throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log(`App is litenning on ${process.env.PORT}`)
       })
    } catch (error) {
        console.error("Error", error)
        throw error
    }
} )()
*/