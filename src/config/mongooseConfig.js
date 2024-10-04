import mongoose from "mongoose";

export const connectUsingMongoose = async()=>{

    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("Mongoose Connected!");
     

    }catch(err){
        console.log("Error connecting to Mongoose")
    }

}