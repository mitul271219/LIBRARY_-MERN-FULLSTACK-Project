import mongoose from "mongoose";


const Addproduct_Schema = mongoose.Schema({
     productCategory:{  type:mongoose.Schema.Types.ObjectId , required: true , ref:'UserAdminCategory_Library'},
    productName:{type:String , required:true},
    productDesc:{type:String , required:true},
    // productDesc:{type:String , required:true},
    productThumb:{type:String , required:true},
    readBookLink: { type: String , required: false , default: ""},
    productOrgPrice:{type:Number , required:true},
    productSalePrice:{type:Number , required:true},
    productSaleStartDate:{type:Date , required:true},
    productSaleEndDate:{type:Date , required:true},
    productStatus:{type:String , enum:['pending' , 'enable' , 'disable'] , default:'enable'},
})



// when i using populate method working like , when i get (Addproduct_Schema) using GET method , so they are also giving me       (UserAdminCategory_Library) all data 
// Addproduct_Schema.pre("find", function(next) {
//     this.populate('productCategory');
//     next();
// });
// Addproduct_Schema.pre("find", function (next) {
//     if (typeof next === "function") {
//         this.populate('productCategory');
//         next();
//     }
// });
Addproduct_Schema.pre(/^find/, function () {
    this.populate('productCategory');
});

const products_AddLibrary = mongoose.model("add_Products" , Addproduct_Schema)

export default products_AddLibrary