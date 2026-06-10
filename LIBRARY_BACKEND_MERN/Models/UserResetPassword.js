import mongoose from "mongoose";

    const userPassResetSchema = mongoose.Schema({
        UserRest_email:{type:String , required:true},
        UserReset_Token:{type:String , required:true},
        UserReset_expiresAt:{type:Date , required:true},
    })


    userPassResetSchema.index({ UserReset_expiresAt: 1 }, { expireAfterSeconds: 0 });

const UserPasswordResetToken = mongoose.model("user_Password_Reset_Library" , userPassResetSchema)

export default UserPasswordResetToken