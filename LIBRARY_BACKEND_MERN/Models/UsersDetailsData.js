import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    name:{type:String , require:true},
    email:{type:String , require:true},
    password:{type:String , require:true},
    isAdmin: { type: Boolean, default: false }
})

const usersLibraryData = mongoose.model("user_Library -Data" , userSchema)

export default usersLibraryData