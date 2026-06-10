

import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import UserTokens from "../Models/UserToken.js";
import contectForm from "../Models/UserContactForm.js";
import shortid from "shortid";
import AdminUserCateGoryLibraru from "../Models/AdminUserCategory.js";
import UserPasswordResetToken from "../Models/UserResetPassword.js";
import sendEmail from "../EmailSender/emailSender.js";
import path from "path";
import fs from "fs";
import products_AddLibrary from "../Models/AdminADDProducts.js";
import usersLibraryData from "../Models/UsersDetailsData.js";
import productsImageMultiple from "../Models/ProductMultipleImages.js";
import CartModel from "../Models/CartModel.js";
import OrderModel from "../Models/OrderModel.js";
dotenv.config()


const CreateUser = async (req , res , next) => {
    // const userDetail = req.body
    console.log(req.body);
    try {
        const {name , email , password} = req.body
        const userExist = await usersLibraryData.findOne({email:email})
        if (userExist) {
            return res.status(400).json({msg:"user_Library email already exist"})
         }
             const saltRound = 10
             const hash_password = await bcrypt.hash(password , saltRound)
            const userLibData =  await usersLibraryData.create({name , email , password:hash_password})
            if (userLibData) {
              console.log("working properly");
              
            }
             if (userLibData) {
                const tokenGenrate = jwt.sign({userId:userLibData._id, useremail: userLibData.email} ,
                                     process.env.jwtSECRET_KEY_USER_TOKEN , {expiresIn:"10m"}) 
                const expiresAt = new Date(Date.now() + (10 * 60 * 1000));  // 10 minute from now
                const UsersTokenData = await UserTokens.create({
                    userId: userLibData._id ,
                    userEmail: userLibData.email ,
                    token: tokenGenrate ,
                    expiresAt: expiresAt ,
                  });
                res.status(200).json({msg:userLibData  , statusMsg:`SignUp successfully & Welcome to E-Books (${userLibData.name})` , userName:userLibData.name , usersTokens: tokenGenrate , userID:userLibData._id.toString() , usermail:userLibData.email , SingUpAllData:userLibData })
             } else {
                res.status(401).json({msg:"Not created User_Data "})
             }
    } catch (err) {
        console.log(err);
        res.status(500).json(`internal server error (CreateUser) ${err} `) 
    }
    
}


const LoginUser = async (req , res , next) => {

    try {

        const { email, password } = req.body;

        const userLogin = await usersLibraryData.findOne({ email:email });

        if (!userLogin) {
            return res.status(400).json({ msg: "invalid email" });
        }

        const userPassCheck = await bcrypt.compare(password , userLogin.password);

        if (!userPassCheck) {
            return res.status(401).json({ msg: "invalid User_Library Password" });
        }

        // check if User_token already exists
        const UsersTokenCheck = await UserTokens.findOne({ userEmail: userLogin.email });
        if (UsersTokenCheck) {
            return res.status(401).json({ msg: `Already (${userLogin.email}) Have Sing_UP` });
        }

        // create User_token
        const tokenGenrate = jwt.sign(
            { userId:userLogin._id, useremail:userLogin.email },
            process.env.jwtSECRET_KEY_USER_TOKEN,
            { expiresIn:"10m" }
        );
        const expiresAt = new Date(Date.now() + (10 * 60 * 1000)); // 10 minute from now

        await UserTokens.create({
            userId: userLogin._id,
            userEmail: userLogin.email,
            token: tokenGenrate,
            expiresAt: expiresAt,
        });

        return res.status(200).json({
            statusMsg:`Login successfully & Welcome to E-Books (${userLogin.name})`,
            userName:userLogin.name,
            usersTokens:tokenGenrate,
            userID:userLogin._id.toString(),
            usermail:userLogin.email ,
            userLoginAllData:userLogin
        });

    } catch (err) {
        res.status(500).json({msg:"Internal Server Error"});
    }
};



  // User checking toke 
  const UserTokenCheck = async (req , res , next) => {
    // console.log(req.body);
    const userstokensdt = req.body.tokens
    try{
           const userstokenchk = await UserTokens.findOne({token:userstokensdt})
            if (!userstokenchk) {
                return res.json({msg:"rejectionUSER_Token"})
            } else {
                return res.json({msg:"successfullyUSER_Token"})
            }
    }catch(err){
        console.log(err);
        res.status(500).json(`internal server error (AdminTokenCheck) ${err} `) 

    }
}



const LogoutUserToken = async (req, res, next) => {
    console.log(req.body);
    try {
      const tokensdt = req.body.tokensData;     
      // safety check
      if (!tokensdt) {
        return res.status(400).json({ msg: "Token-User not provided" });
      }
      // delete token
      const LogOut_deleteToken = await UserTokens.deleteOne({ token: tokensdt });
      if (LogOut_deleteToken.deletedCount === 0) {
        // token not found in DB
        return res.json({ msg: "rejectionDeleteTokenUser" });
      } else {
        // token deleted successfully
        return res.json({ msg: "successfullyDeleteTokenUser" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server error" });
    }
  };



  const authMiddlewareUser = async (req, res, next) => {
      const authHeader = req.headers.authorization;
    //   console.log(authHeader);
      
    try { 
      if (!authHeader) {
        return res.status(401).json({ msg: "Please SignUP & Token not provided" });
      }
  
      const isVerified = jwt.verify(authHeader, process.env.jwtSECRET_KEY_USER_TOKEN);
    //   console.log("Token isVerified:", isVerified);
  
      const userDataVerified = await usersLibraryData.findOne({ email: isVerified.useremail }).select({ password: 0 });
      console.log(userDataVerified);
      
      if (!userDataVerified) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      req.userAdminData = userDataVerified;
    //   console.log("req.user attached:", req.user.email);
      next();
    } catch (err) {
      console.error("authMiddleware error:", err);
      return res.status(401).json({ msg: "Unauthorized. Invalid token" });
    }
  };



     // getTokenVerifyData => Admin toke and send as a responce this (token user data)
    const getTokenVerifyData = async (req , res , next) => {
        console.log(req.userAdminData);
        try {
            return res.status(200).json({ msg: req.userAdminData  , details:"getTokenVerifyData" }); // frontend gets user info
          } catch (err) {
            return res.status(500).json({ msg: "Something went wrong" });
          }
    }

    const  adminMiddleware = (req, res, next) => {
        // console.log("adminMiddleware called");
        if (!req.userAdminData.isAdmin) { // ex isAdmin not true call this situation
          return res.status(403).json({ msg: "Access denied. User is not admin" });
        }
        // console.log("Admin access granted");
        next();
      };


// SendRestLink
  const SendRestLink  = async (req , res , next) => {
    console.log(req.body.email);
    try{
    const {email} = req.body
    const findUserEmail = await usersLibraryData.findOne({email:email})
    // console.log(findAdmin);
    if (!findUserEmail) {
        return res.status(400).json({msg:"Incorrect Email"})
    } else {
        const subject = "e-Books : Reset Password link"
        const reset_token = shortid.generate() // generate uniq id , (like genrate token)
        const expiresAt = new Date(Date.now() + (10 * 60 * 1000)); // 10 minute from now
        // Your Reset Password Link  
        const resetLink = ` http://localhost:3001/userpassreset/${reset_token}`

        const adminResetTokenData = await UserPasswordResetToken.create({
            UserRest_email:findUserEmail.email,
            UserReset_Token:reset_token,
            UserReset_expiresAt:expiresAt
       });

     // ✅ Send email  (to, subject, text,)
    //  console.log(findUserEmail.email, subject, resetLink);
     await sendEmail({to:findUserEmail.email , subject:subject, text:resetLink});
    return res.status(200).json({msg:"successfully Reset Email_LINK In Ethereal" , rest_url: resetLink , createResetPass:adminResetTokenData  , mail_Link:'https://ethereal.email/messages'}) 
    }
    }catch(err){
        console.log(err);
        res.status(500).json(`internal server error (User_Password_Reset) ${err} `) 

    }
}


//  Reset Password Functionality 
const resetPassword = async (req, res, next) => {
    // console.log(req.body);
    try {
        const {resetToken , user_NewPass} = req.body
        const hashUser_pass = await bcrypt.hash(user_NewPass , 10)
        
        const findUserResetToken = await UserPasswordResetToken.findOne({UserReset_Token:resetToken}) 
            //  console.log(findAdminResetToken + "work");
        if (!findUserResetToken) {
            return res.status(400).json({msg:"ResetAdmin Token is Expired"})
        }else{
            // console.log("token right");
            const updatedData = await usersLibraryData.updateOne({email:findUserResetToken.UserRest_email} , {$set:{password:hashUser_pass}})
        }
        const deleteToken_UniqID = await UserPasswordResetToken.deleteOne({UserReset_Token: resetToken});
        console.log(deleteToken_UniqID);
        
        return res.status(200).json({msg:"Your Password is Updated Successfully"})
     
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server error Reset Password" });
    }
  };


  // contactForm Create 
  const contactFormUser = async (req , res) => {
      const response = req.body 
      console.log(response);
    try{
       const contactData = await contectForm.create(response)
        return res.status(200).json({message:"message send successfully" , userContact:contactData})
    }catch(err){
        return res.status(500).json({message:"message not delivered"})
    }
}



// uploding CateGory image and cateGoryName contatnt
const upload_USER_ADMIN_Category = async (req , res) => { 
    const { categoryName } = req.body; // ✅ extract string
    const { filename } = req.file;     // ✅ extract image filename
    // console.log(cat_name);
    // console.log(cat_image);

    try {
        const adminAddCategory = await AdminUserCateGoryLibraru.create({
            categoryName: categoryName,      // ✅ now a string
            categoryImage: filename,         // ✅ filename string
       });
       res.status(200).json({msg:"Category File uploaded successfully" , dataAddcategory:adminAddCategory})
      } catch (err) {
        console.error("uploadPic error:", err);
        res.status(500).json({ msg: "Internal server error" });
      }
}


// Get_Upload_User_Category
const Get_Upload_User_Category = async (req , res) => { 
    try {
        const adminGetCategory = await AdminUserCateGoryLibraru.find();
       res.status(200).json({msg:"Category Get successfully" , adminGetCategory})
      } catch (err) {
        console.error("uploadPic error:", err);
        res.status(500).json({ msg: "Internal server error" });
      }
}



// deleteCategory with also delete uploads image
const categoryDirname = path.join(import.meta.dirname , '..' , 'uploadsProducts&CategoryData')
// console.log(categoryDirname);
// deleteCategory
const deleteCategory = async (req , res) => { 
    const id = req.params.id
    // console.log(id);
    const findAdmincategory = await AdminUserCateGoryLibraru.findOne({_id:id})
    // console.log(findAdmincategory);
    if (!findAdmincategory) {
        return res.status(400).json({msg:"Delete ID Not Matched"})
    }
    const fileImagePath = path.join(categoryDirname , findAdmincategory.categoryImage)
    console.log(fileImagePath);
    try {
        const adminDeltCategory = await AdminUserCateGoryLibraru.deleteOne({_id:id})
        //delete categoryImage and also delete in upload images Folder
        fs.unlinkSync(fileImagePath)
        return res.status(200).json({msg:"Category Delete Successfully" , catDelete:adminDeltCategory})
    } catch (err) {
     console.error("deleteUserById error:", err);
     return res.status(500).json({ msg: "Internal server error (deleteUserById)" });
    }
}



// addProducts 
const addProducts = async (req , res) => { 
    // console.log(req.body);
    // console.log(req.file.filename);
    
try {
    const AddProduct = await products_AddLibrary.create({
        productCategory: req.body.categoryName, // this should be an ObjectId from the category collection
        productName: req.body.productName,
        productDesc: req.body.productDescription,
        productThumb: req.file?.filename,
        readBookLink: req.body.readBookLink,
        productOrgPrice: req.body.productPrice,
        productSalePrice: req.body.productSalePrice,
        productSaleStartDate: req.body.saleStartDate,
        productSaleEndDate: req.body.saleEndDate,
   });
   res.status(200).json({msg:"AddProduct successfully" , dataAddProduct:AddProduct})
  } catch (err) {
    console.error("AddProduct error:", err);
    res.status(500).json({ msg: "AddProduct error:", err });
  }
}

// updateStatus enable and disble consition
const updateProductStatus = async (req, res) => {
  // console.log(req.params.id,req.body); 
  try {

    const { productStatus } = req.body;
    const updateStatus = await products_AddLibrary.findByIdAndUpdate(
      req.params.id,
      {
        productStatus: productStatus,
      },
      {
        new: true,
      }
    );
        res.status(200).json({ msg: "Product Status Updated",updatedProduct: updateStatus,});
   } catch (err) {
    console.log(err);
    res.status(500).json({msg: "Status Update Error",});
  }
};


// Get Product
const GetProductData = async (req , res) => { 
  try {
      const productGet = await products_AddLibrary.find();
     res.status(200).json({msg:"Product Get successfully" , productGet})
    } catch (err) {
      console.error("Get_Product error:", err);
      res.status(500).json({ msg: `GetProduct Error ${err}` });
    }
}


 // Multi_Image_uploding contatnt
const multiplesImages = async (req , res) => { 
  const productId = req.params.id;
  const files = req.files; // <--- Important!
  // console.log(productId);
  console.log("ProductID" + productId );
  console.log("Files" + files);

  try {
     // Save all images
  const imagePromises = files.map(file =>
    productsImageMultiple.create({
        proID: productId,
        productImage: file.filename,  
      })
    );

    const multiImageCreateData = await Promise.all(imagePromises);
     res.status(200).json({msg:"MultiImageCreate File uploaded successfully" , multiImageCreateData})
    } catch (err) {
      console.error("MultiImageCreate error:", err);
      res.status(500).json({ msg: "Internal server error" });
    }
}




// GET SINGLE PRODUCT FOR MULTIPLE IMAGES GET
const getSingleProduct_Multipleimage = async (req, res) => {

  try {

    const productId = req.params.id;

    // SINGLE PRODUCT
    const singleProduct = await products_AddLibrary.findById(productId);

    // MULTIPLE IMAGES
    const multipleImages = await productsImageMultiple.find({
      proID: productId
    });

    if (!singleProduct) {
      return res.status(404).json({
        msg: "Product Not Found"
      });
    }

    return res.status(200).json({
      msg: "Single Product Data",
      singleProduct,
      multipleImages
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      msg: "Single Product Error"
    });

  }

};




// deleteProduct 
const productDirname = path.join(import.meta.dirname , '..' , 'uploadsProducts&CategoryData')
const deleteProduct = async (req, res) => {

  const id = req.params.id;

  try {

      // find product
      const findProduct = await products_AddLibrary.findOne({ _id: id });

      if (!findProduct) {
          return res.status(404).json({
              msg: "Product Not Found",
          });
      }

      // image path
      const fileImagePath = path.join(
          productDirname,
          findProduct.productThumb
      );

      // delete mongodb product
      const deleteProduct = await products_AddLibrary.deleteOne({ _id: id });

      // delete image from uploads folder
      if (fs.existsSync(fileImagePath)) {
          fs.unlinkSync(fileImagePath);
      }

      return res.status(200).json({
          msg: "Product Deleted Successfully",
          deleteProduct
      });

  } catch (err) {

      console.log(err);

      return res.status(500).json({
          msg: "Delete Product Error",
      });

  }
};



// ADD TO CART 
const addToCart = async (req, res) => {
  try {

    const userId = req.userAdminData._id;
    const { productId } = req.body;

    const alreadyCart = await CartModel.findOne({
      userId,
      productId,
    });

    if (alreadyCart) {

      alreadyCart.quantity += 1;

      await alreadyCart.save();

      return res.status(200).json({
        msg: "Quantity Increased",
      });
    }

    const cartData = await CartModel.create({
      userId,
      productId,
      quantity: 1,
    });

    return res.status(200).json({
      msg: "Added To Cart",
      cartData,
    });

  } catch (err) {

    return res.status(500).json({
      msg: "Cart Error",
    });

  }
};


// GET CART DATA
const getCartData = async (req, res) => {

  try {

    console.log("getCartData "+req.userAdminData);

    const userId = req.userAdminData._id;

    const cartItems = await CartModel.find()

    return res.status(200).json({
      cartItems,
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      msg: "Cart Fetch Error",
      error: err.message
    });

  }

};


// UPDATE_Cart_Quantity
const updateCartQuantity = async (req, res) => {

  try {

    const { cartId } = req.params;

    const { type } = req.body;

    const cart = await CartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        msg: "Cart Not Found",
      });
    }

    if (type === "inc") {
      cart.quantity += 1;
    }

    if (type === "dec") {

      if (cart.quantity > 1) {
        cart.quantity -= 1;
      }

    }

    await cart.save();

    return res.status(200).json({
      msg: "Quantity Updated",
    });

  } catch (err) {

    return res.status(500).json({
      msg: "Quantity Error",
    });

  }

};



// REMOVE SINGLE CART ITEM
const removeCartItem = async (req, res) => {

  try {

    await CartModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      msg: "Cart Item Removed",
    });

  } catch (err) {

    return res.status(500).json({
      msg: "Delete Cart Error",
    });

  }

};



//REMOVE ALL CART
const clearCart = async (req, res) => {

  try {

    const userId = req.userAdminData._id;

    await CartModel.deleteMany({
      userId,
    });

    return res.status(200).json({
      msg: "Cart Cleared",
    });

  } catch (err) {

    return res.status(500).json({
      msg: "Clear Cart Error",
    });

  }

};



// CREATE ORDER (PAYMENT)
const createOrder = async (req, res) => {

  try {

    const userId = req.userAdminData._id;

    const {
      products,
      address,
      paymentMethod,
      totalPrice,
    } = req.body;

    const orderCreate = await OrderModel.create({
      userId,
      products,
      address,
      paymentMethod,
      totalPrice,
      paymentStatus:
        paymentMethod === "COD"
          ? "Pending"
          : "Paid",
    });

    await CartModel.deleteMany({
      userId,
    });

    return res.status(200).json({
      msg: "Order Success",
      orderCreate,
    });

  } catch (err) {

    return res.status(500).json({
      msg: "Order Error",
    });

  }

};




// ORDER HISTORY
const getOrderHistory = async (req, res) => {

  try {

    const userId = req.userAdminData._id;

    const orders = await OrderModel.find()

    return res.status(200).json({
      orders,
    });

  } catch (err) {

    return res.status(500).json({
      msg: "Order History Error",
    });

  }

};


export{CreateUser , LoginUser , UserTokenCheck , LogoutUserToken , authMiddlewareUser , adminMiddleware , getTokenVerifyData , SendRestLink , contactFormUser , upload_USER_ADMIN_Category , Get_Upload_User_Category , resetPassword , deleteCategory , addProducts , updateProductStatus , GetProductData , multiplesImages , getSingleProduct_Multipleimage  , deleteProduct  ,   addToCart,getCartData , updateCartQuantity , removeCartItem , clearCart , createOrder , getOrderHistory}