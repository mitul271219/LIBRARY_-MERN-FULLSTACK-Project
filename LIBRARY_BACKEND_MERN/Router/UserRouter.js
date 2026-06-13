import express from 'express'
import { addProducts, addToCart, adminMiddleware, authMiddlewareUser, clearCart, Contact_User_Get, contactFormUser, createOrder, CreateUser, deleteCategory, deleteContact, deleteProduct, deleteUser, Get_Upload_User_Category, getCartData, getOrderHistory, GetProductData, getSingleProduct_Multipleimage, Login_User_Get, LoginUser, LogoutUserToken, multiplesImages, removeCartItem, resetPassword, SendRestLink, updateCartQuantity, updateProductStatus, upload_USER_ADMIN_Category, UserTokenCheck } from '../Controler/UserControler.js';
import multer from "multer";
import shortid from "shortid";
import path from "path";




const userRouter = express.Router()


// storage engine setup using this function(uploadPicCategory)
const storage = multer.diskStorage({
    destination: './uploadsProducts&CategoryData/',
    filename: function (req, file, cb) {
        const iName = shortid.generate()
      cb(null, iName+path.extname(file.originalname))
    },
  })

// For Category 
const uploadCategoryData = multer({
    storage:storage
})
// For ADD_Products
const addproductMulter = multer({
    storage:storage
})
const multiple_Image = multer({
  storage:storage
})
// const multiple_Image = multer({
//   storage:storage
// })


// userRouter.route('/about').get()
userRouter.route('/createUsers').post(CreateUser)
userRouter.route('/loginUsers').post(LoginUser)
userRouter.route('/Login&SignupUsersGet').get(Login_User_Get)
userRouter.route("/deleteUser/:id").delete(deleteUser);
userRouter.route('/tokenUserCheck').post(UserTokenCheck)
userRouter.route('/userLogout').post(LogoutUserToken)
userRouter.route('/senderestlink').post(SendRestLink)
userRouter.route('/resetpassword').post(resetPassword)
userRouter.route('/userContactForms').post( authMiddlewareUser , contactFormUser)
userRouter.route('/userContactGet').get(Contact_User_Get)
userRouter.route("/deleteContact/:id").delete(deleteContact);
// multer Routes (upload Image)
userRouter.route('/adminUserCategory').post(uploadCategoryData.single('categoryImage') , upload_USER_ADMIN_Category)
// userRouter.route('/adminUserCategory').get(authMiddlewareUser , adminMiddleware , Get_Upload_User_Category)
userRouter.route('/adminUserCategory').get( Get_Upload_User_Category)
userRouter.route('/deleteCategory/:id').delete(deleteCategory)
userRouter.route('/addProducts').post(addproductMulter.single('productThumbnail') , addProducts)
userRouter.route('/updateProductStatus/:id').put(updateProductStatus)
userRouter.route('/getProducts').get(GetProductData)
userRouter.route('/uploadMulImages/:id').post(multiple_Image.array('multiImages') , multiplesImages)
userRouter.route('/getSingleProduct/:id').get(getSingleProduct_Multipleimage)
userRouter.route('/deleteProduct/:id').delete(deleteProduct)
// CART
userRouter.route("/addCart").post(authMiddlewareUser,addToCart);
userRouter.route("/getCart").get(authMiddlewareUser,getCartData);
userRouter.route("/updateCart/:cartId").put(authMiddlewareUser,updateCartQuantity);
userRouter.route("/removeCart/:id").delete(authMiddlewareUser,removeCartItem);
userRouter.route("/clearCart").delete(authMiddlewareUser,clearCart);
// ORDER
userRouter.route("/createOrder").post(authMiddlewareUser,createOrder);
userRouter.route("/orderHistory").get(authMiddlewareUser,getOrderHistory);




export default userRouter;