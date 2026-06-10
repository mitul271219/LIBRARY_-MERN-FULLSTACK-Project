import mongoose from "mongoose";


const UserAdmin_category_Schema = mongoose.Schema({
    categoryName:{type:String , required:true},
    categoryImage:{type:String , required:true}
})



const AdminUserCateGoryLibraru = mongoose.model("UserAdminCategory_Library" , UserAdmin_category_Schema)

export default AdminUserCateGoryLibraru