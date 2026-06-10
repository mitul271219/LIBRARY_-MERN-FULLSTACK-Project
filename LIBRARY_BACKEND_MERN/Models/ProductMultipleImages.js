import mongoose from "mongoose";

const productImage_Schema = mongoose.Schema({
    productImage:{type:String , required:true},
    proID:{  type:mongoose.Schema.Types.ObjectId , required: true , ref:'add_Products'},
})


productImage_Schema.pre(/^find/, function () {
    this.populate('proID');
});


const productsImageMultiple = mongoose.model("Product_Image_Multiple_Library" , productImage_Schema)

export default productsImageMultiple