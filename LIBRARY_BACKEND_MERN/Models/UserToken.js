import mongoose from "mongoose";

const userTokenSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user_Library'
    },
    userEmail:{type:String , require:true},
    token:{type:String , required:true},
    expiresAt:{type:Date , required:true},

})


userTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const UserTokens = mongoose.model("Users_Token_Library" , userTokenSchema)

export default UserTokens