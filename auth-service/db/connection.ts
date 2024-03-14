import mongoose from "mongoose";


let URL:string =  process.env.MONGO_URI as string


const connectDB = async() => {
    try{
    const conn = await mongoose.connect(URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        const typedError = error as Error;
        console.error(`Error: ${typedError?.message}`);
        process.exit(1);
    }
}

export default connectDB;