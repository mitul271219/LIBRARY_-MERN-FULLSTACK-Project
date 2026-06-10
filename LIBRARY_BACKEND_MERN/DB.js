import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const mongoURI = process.env.DBKEY; 
const ConnectDB = async () => {
    try {
            await mongoose.connect(mongoURI)
            console.error("Library database connected")
    } catch (err) {
        console.error("Library database connection is failed , " , err)
        process.exit(0)
    }
}

export default ConnectDB;
