import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const createUsersApiPostMethod = createAsyncThunk(
//   "createUsersApiPostMethod",
//   async (signupData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:3011/createUsers`,
//         signupData
//       );
//       return await res.data;
//     } catch (err) {
//       // Pass backend error message to the rejected action
//       return rejectWithValue(err);
//     }
//   }
// );



// export const loginUsersApiPostMethod = createAsyncThunk(
//   "loginUsersApiPostMethod",
//   async (loginData, { rejectWithValue }) => {
//     // console.log(loginData);
//     try {
//       const res = await axios.post(
//         `http://localhost:3011/loginUsers`,
//         loginData
//       );
//       return await res.data;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

// export const userTokenCheckPostMethod = createAsyncThunk(
//   "userTokenCheckPostMethod",
//   async (tokens, { rejectWithValue }) => {
//     console.log(tokens);

//     try {
//       const res = await axios.post(`http://localhost:3011/tokenUserCheck`, {
//         tokens: tokens,
//       });
//       return res; // success
//     } catch (err) {
//       // Pass backend error message to the rejected action
//       return rejectWithValue(err);
//     }
//   }
// );

// export const UserLogOutPost = createAsyncThunk(
//   "UserLogOutPost",
//   async (tokens, { rejectWithValue }) => {
//     // console.log(tokens);
//     try {
//       const res = await axios.post(`http://localhost:3011/userLogout`, {
//         tokensData: tokens,
//       });
//       return res; // success
//     } catch (err) {
//       // Pass backend error message to the rejected action
//       return rejectWithValue(err);
//     }
//   }
// );

// export const UserForgotResetPassPost = createAsyncThunk(
//   "UserForgotResetPassPost",
//   async (userEmail, { rejectWithValue }) => {
//     // console.log(userEmail);
//     try {
//       const res = await axios.post(
//         `http://localhost:3011/senderestlink`,
//         userEmail
//       );
//       return res; // success
//     } catch (err) {
//       // Pass backend error message to the rejected action
//       return rejectWithValue(err);
//     }
//   }
// );

// export const UserResetPasswordPost = createAsyncThunk(
//   "UserResetPasswordPost",
//   async (user, { rejectWithValue }) => {
//     // console.log(user);
//     try {
//       const res = await axios.post(`http://localhost:3011/resetpassword`, {
//         resetToken: user.reset_token,
//         user_NewPass: user.passwordreset,
//       });
//       return res; // success
//     } catch (err) {
//       // Pass backend error message to the rejected action
//       return rejectWithValue(err);
//     }
//   }
// );

// export const UserContactPost = createAsyncThunk(
//   "UserLogOutPost",
//   async (userFormData, { rejectWithValue }) => {
//     // console.log(userFormData);
//     try {
//       const res = await axios.post(
//         `http://localhost:3011/userContactForms`,
//         userFormData.contactForm,
//         {
//           headers: { Authorization: userFormData?.userToken },
//         }
//       );
//       return res; // success
//     } catch (err) {
//       // Pass backend error message to the rejected action
//       return rejectWithValue(err);
//     }
//   }
// );

// export const AdminUserCategoryPost = createAsyncThunk(
//   "postMernAdminAddCategory",
//   async (formData, { rejectWithValue }) => {
//     console.log(formData);
//     try {
//       const res = await axios.post(
//         `http://localhost:3011/adminUserCategory`,
//         formData
//       );
//       return res; // success
//     } catch (err) {
//       // Pass backend error message to the rejected action
//       return rejectWithValue(err);
//     }
//   }
// );

// export const AdminUserCategoryGET = createAsyncThunk(
//   "getMernAdminAllCategories",
//   async (userToken, { rejectWithValue }) => {
//     //  console.log(userToken);
//     try {
//       const res = await axios.get("http://localhost:3011/adminUserCategory", {
//         headers: {
//           Authorization: userToken,
//         },
//       });
//       return res.data; // array of categories
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const deleteMernAdminCategories = createAsyncThunk(
//   "deleteMernAdminCategories",
//   async (id, { rejectWithValue }) => {
//     // console.log(id);
//     try {
//       const res = await axios.delete(
//         `http://localhost:3011/deleteCategory/${id}`
//       );
//       return {
//         ids: id,
//         deletRes: res.data,
//       };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const postAddProduct = createAsyncThunk(
//   "postAddProduct",
//   async (formData, { rejectWithValue }) => {
//     console.log(formData);
//     try {
//       const res = await axios.post(
//         `http://localhost:3011/addProducts`,
//         formData
//       );
//       return res; // success
//     } catch (err) {
//       // Pass backend error message to the rejected action
//       return rejectWithValue(err);
//     }
//   }
// );

// export const updateProductStatusThunk = createAsyncThunk(
//   "updateProductStatusThunk",
//   async ({ id, status }, { rejectWithValue }) => {
//     // console.log(id , status);
//     try {
//       const res = await axios.put(
//         `http://localhost:3011/updateProductStatus/${id}`,
//         {
//           productStatus: status,
//         }
//       );
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const getAddProduct = createAsyncThunk(
//   "getAddProduct",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get("http://localhost:3011/getProducts");
//       return res.data; // array of categories
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const deleteProductThunk = createAsyncThunk(
//   "deleteProductThunk",
//   async (id, { rejectWithValue }) => {
//     console.log(id);

//     try {
//       const res = await axios.delete(
//         `http://localhost:3011/deleteProduct/${id}`
//       );

//       return {
//         id: id,
//         response: res.data,
//       };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const postMutipleImages = createAsyncThunk(
//   "postMutipleImages",
//   async (formDataUser, { rejectWithValue }) => {
//     console.log(formDataUser);
//     try {
//       const res = await axios.post(
//         `http://localhost:3011/uploadMulImages/${formDataUser.ismodelOpen}`,
//         formDataUser.formData
//       );
//       return res; // success
//     } catch (err) {
//       // Pass backend error message to the rejected action
//       return rejectWithValue(err);
//     }
//   }
// );

// // getSingle or Multiple image GET
// export const getSingleProductThunk = createAsyncThunk(
//   "single/product",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3011/getSingleProduct/${id}`
//       );
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

// // Add to Cart
// export const addCartThunk = createAsyncThunk(
//   "addCartThunk",
//   async (data, { rejectWithValue }) => {
//     console.log(data);

//     try {
//       const res = await axios.post(
//         "http://localhost:3011/addCart",
//         {
//           productId: data.productId,
//         },
//         {
//           headers: {
//             Authorization: data.token,
//           },
//         }
//       );

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// // GET Cart
// export const getCartThunk = createAsyncThunk(
//   "getCartThunk",
//   async (token, { rejectWithValue }) => {
//     try {
//       const res = await axios.get("http://localhost:3011/getCart", {
//         headers: {
//           Authorization: token,
//         },
//       });

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// // UPDATE QUANTITY
// export const updateCartThunk = createAsyncThunk(
//   "updateCartThunk",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:3011/updateCart/${data.cartId}`,
//         {
//           type: data.type,
//         },
//         {
//           headers: {
//             Authorization: data.token,
//           },
//         }
//       );

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// // REMOVE SINGLE CART ITEM
// export const removeCartThunk = createAsyncThunk(
//   "removeCartThunk",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:3011/removeCart/${data.cartId}`,
//         {
//           headers: {
//             Authorization: data.token,
//           },
//         }
//       );

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// // CLEAR ALL CART
// export const clearCartThunk = createAsyncThunk(
//   "clearCartThunk",
//   async (token, { rejectWithValue }) => {
//     try {
//       const res = await axios.delete("http://localhost:3011/clearCart", {
//         headers: {
//           Authorization: token,
//         },
//       });

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// // CREATE ORDER
// export const createOrderThunk = createAsyncThunk(
//   "createOrderThunk",

//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3011/createOrder",

//         {
//           products: data.products,
//           address: data.address,
//           paymentMethod: data.paymentMethod,
//           totalPrice: data.totalPrice,
//         },

//         {
//           headers: {
//             Authorization: data.token,
//           },
//         }
//       );

//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );



// // ORDER HISTORY
// export const getOrderHistoryThunk = createAsyncThunk(
//   "getOrderHistoryThunk",

//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3011/orderHistory",

//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );













// deploy apis 

export const createUsersApiPostMethod = createAsyncThunk(
  "createUsersApiPostMethod",
  async (signupData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://library-mern-fullstack-project.onrender.com/createUsers`,
        signupData
      );
      return await res.data;
    } catch (err) {
      // Pass backend error message to the rejected action
      return rejectWithValue(err);
    }
  }
);



export const loginUsersApiPostMethod = createAsyncThunk(
  "loginUsersApiPostMethod",
  async (loginData, { rejectWithValue }) => {
    // console.log(loginData);
    try {
      const res = await axios.post(
        `https://library-mern-fullstack-project.onrender.com/loginUsers`,
        loginData
      );
      return await res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userTokenCheckPostMethod = createAsyncThunk(
  "userTokenCheckPostMethod",
  async (tokens, { rejectWithValue }) => {
    console.log(tokens);

    try {
      const res = await axios.post(`https://library-mern-fullstack-project.onrender.com/tokenUserCheck`, {
        tokens: tokens,
      });
      return res; // success
    } catch (err) {
      // Pass backend error message to the rejected action
      return rejectWithValue(err);
    }
  }
);

export const UserLogOutPost = createAsyncThunk(
  "UserLogOutPost",
  async (tokens, { rejectWithValue }) => {
    // console.log(tokens);
    try {
      const res = await axios.post(`https://library-mern-fullstack-project.onrender.com/userLogout`, {
        tokensData: tokens,
      });
      return res; // success
    } catch (err) {
      // Pass backend error message to the rejected action
      return rejectWithValue(err);
    }
  }
);

export const UserForgotResetPassPost = createAsyncThunk(
  "UserForgotResetPassPost",
  async (userEmail, { rejectWithValue }) => {
    // console.log(userEmail);
    try {
      const res = await axios.post(
        `https://library-mern-fullstack-project.onrender.com/senderestlink`,
        userEmail
      );
      return res; // success
    } catch (err) {
      // Pass backend error message to the rejected action
      return rejectWithValue(err);
    }
  }
);

export const UserResetPasswordPost = createAsyncThunk(
  "UserResetPasswordPost",
  async (user, { rejectWithValue }) => {
    // console.log(user);
    try {
      const res = await axios.post(`https://library-mern-fullstack-project.onrender.com/resetpassword`, {
        resetToken: user.reset_token,
        user_NewPass: user.passwordreset,
      });
      return res; // success
    } catch (err) {
      // Pass backend error message to the rejected action
      return rejectWithValue(err);
    }
  }
);

export const UserContactPost = createAsyncThunk(
  "UserLogOutPost",
  async (userFormData, { rejectWithValue }) => {
    // console.log(userFormData);
    try {
      const res = await axios.post(
        `https://library-mern-fullstack-project.onrender.com/userContactForms`,
        userFormData.contactForm,
        {
          headers: { Authorization: userFormData?.userToken },
        }
      );
      return res; // success
    } catch (err) {
      // Pass backend error message to the rejected action
      return rejectWithValue(err);
    }
  }
);

export const AdminUserCategoryPost = createAsyncThunk(
  "postMernAdminAddCategory",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const res = await axios.post(
        `https://library-mern-fullstack-project.onrender.com/adminUserCategory`,
        formData
      );
      return res; // success
    } catch (err) {
      // Pass backend error message to the rejected action
      return rejectWithValue(err);
    }
  }
);

export const AdminUserCategoryGET = createAsyncThunk(
  "getMernAdminAllCategories",
  async (userToken, { rejectWithValue }) => {
    //  console.log(userToken);
    try {
      const res = await axios.get("https://library-mern-fullstack-project.onrender.com/adminUserCategory", {
        headers: {
          Authorization: userToken,
        },
      });
      return res.data; // array of categories
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteMernAdminCategories = createAsyncThunk(
  "deleteMernAdminCategories",
  async (id, { rejectWithValue }) => {
    // console.log(id);
    try {
      const res = await axios.delete(
        `https://library-mern-fullstack-project.onrender.com/deleteCategory/${id}`
      );
      return {
        ids: id,
        deletRes: res.data,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const postAddProduct = createAsyncThunk(
  "postAddProduct",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const res = await axios.post(
        `https://library-mern-fullstack-project.onrender.com/addProducts`,
        formData
      );
      return res; // success
    } catch (err) {
      // Pass backend error message to the rejected action
      return rejectWithValue(err);
    }
  }
);

export const updateProductStatusThunk = createAsyncThunk(
  "updateProductStatusThunk",
  async ({ id, status }, { rejectWithValue }) => {
    // console.log(id , status);
    try {
      const res = await axios.put(
        `https://library-mern-fullstack-project.onrender.com/updateProductStatus/${id}`,
        {
          productStatus: status,
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getAddProduct = createAsyncThunk(
  "getAddProduct",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://library-mern-fullstack-project.onrender.com/getProducts");
      return res.data; // array of categories
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "deleteProductThunk",
  async (id, { rejectWithValue }) => {
    console.log(id);

    try {
      const res = await axios.delete(
        `https://library-mern-fullstack-project.onrender.com/deleteProduct/${id}`
      );

      return {
        id: id,
        response: res.data,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const postMutipleImages = createAsyncThunk(
  "postMutipleImages",
  async (formDataUser, { rejectWithValue }) => {
    console.log(formDataUser);
    try {
      const res = await axios.post(
        `https://library-mern-fullstack-project.onrender.com/uploadMulImages/${formDataUser.ismodelOpen}`,
        formDataUser.formData
      );
      return res; // success
    } catch (err) {
      // Pass backend error message to the rejected action
      return rejectWithValue(err);
    }
  }
);

// getSingle or Multiple image GET
export const getSingleProductThunk = createAsyncThunk(
  "single/product",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://library-mern-fullstack-project.onrender.com/getSingleProduct/${id}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Add to Cart
export const addCartThunk = createAsyncThunk(
  "addCartThunk",
  async (data, { rejectWithValue }) => {
    console.log(data);

    try {
      const res = await axios.post(
        "https://library-mern-fullstack-project.onrender.com/addCart",
        {
          productId: data.productId,
        },
        {
          headers: {
            Authorization: data.token,
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// GET Cart
export const getCartThunk = createAsyncThunk(
  "getCartThunk",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://library-mern-fullstack-project.onrender.com/getCart", {
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// UPDATE QUANTITY
export const updateCartThunk = createAsyncThunk(
  "updateCartThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `https://library-mern-fullstack-project.onrender.com/updateCart/${data.cartId}`,
        {
          type: data.type,
        },
        {
          headers: {
            Authorization: data.token,
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// REMOVE SINGLE CART ITEM
export const removeCartThunk = createAsyncThunk(
  "removeCartThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `https://library-mern-fullstack-project.onrender.com/removeCart/${data.cartId}`,
        {
          headers: {
            Authorization: data.token,
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// CLEAR ALL CART
export const clearCartThunk = createAsyncThunk(
  "clearCartThunk",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.delete("https://library-mern-fullstack-project.onrender.com/clearCart", {
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// CREATE ORDER
export const createOrderThunk = createAsyncThunk(
  "createOrderThunk",

  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://library-mern-fullstack-project.onrender.com/createOrder",

        {
          products: data.products,
          address: data.address,
          paymentMethod: data.paymentMethod,
          totalPrice: data.totalPrice,
        },

        {
          headers: {
            Authorization: data.token,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



// ORDER HISTORY
export const getOrderHistoryThunk = createAsyncThunk(
  "getOrderHistoryThunk",

  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://library-mern-fullstack-project.onrender.com/orderHistory",

        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);












const library = createSlice({
  name: "librarySlice",
  initialState: {
    isLibraryLoading: false,
    Libraryreject: false,
    libraryError: null,
    libraryBooks: [],
    libraryCategory: [],
    multipleImages: [],
    singleProductData: null,
    cartData: [],
    cartLoading: false,
    wishlistData: [],
    orderHistory: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // ================= LOGIN =================
    // 🔄 Pending
    builder.addCase(loginUsersApiPostMethod.pending, (state) => {
      state.isLibraryLoading = true;
      state.Libraryreject = false;
      state.libraryError = null;
    });

    // ✅ Success
    builder.addCase(loginUsersApiPostMethod.fulfilled, (state, action) => {
      state.isLibraryLoading = false;
      state.Libraryreject = false;
    });

    // ❌ Error
    builder.addCase(loginUsersApiPostMethod.rejected, (state, action) => {
      state.isLibraryLoading = false;
      state.Libraryreject = true;
      state.libraryError = action.payload;
    });

    // ================= Forgot Rset Password =================
    // 🔄 Pending (loading start)
    builder.addCase(UserForgotResetPassPost.pending, (state) => {
      state.isLibraryLoading = true;
      state.Libraryreject = false;
      state.libraryError = null;
    });

    // ✅ Fulfilled (success)
    builder.addCase(UserForgotResetPassPost.fulfilled, (state, action) => {
      state.isLibraryLoading = false;
      state.Libraryreject = false;
    });

    // ❌ Rejected (error)
    builder.addCase(UserForgotResetPassPost.rejected, (state, action) => {
      state.isLibraryLoading = false;
      state.Libraryreject = true;
      state.libraryError = action.payload; // ✅ store error
    });

    // ================= Rset Password Link =================
    // 🔄 Pending
    builder.addCase(UserResetPasswordPost.pending, (state) => {
      state.isLibraryLoading = true;
      state.Libraryreject = false;
      state.libraryError = null;
    });

    // ✅ Success
    builder.addCase(UserResetPasswordPost.fulfilled, (state) => {
      state.isLibraryLoading = false;
      state.Libraryreject = false;
    });

    // ❌ Error
    builder.addCase(UserResetPasswordPost.rejected, (state, action) => {
      state.isLibraryLoading = false;
      state.Libraryreject = true;
      state.libraryError = action.payload;
    });

    // ================= LibraryBookscategory (GET) =================
    // 🔄 Pending
    builder.addCase(AdminUserCategoryGET.pending, (state) => {
      state.isLibraryLoading = true;
      state.Libraryreject = false;
      state.libraryError = null;
    });
    // ✅ Success
    builder.addCase(AdminUserCategoryGET.fulfilled, (state, action) => {
      state.isLibraryLoading = false;
      state.Libraryreject = false;
      state.libraryCategory = action.payload;
    });
    // ❌ Error
    builder.addCase(AdminUserCategoryGET.rejected, (state, action) => {
      state.isLibraryLoading = false;
      state.Libraryreject = true;
      state.libraryError = action.payload;
    });

    // ================= deleteMernAdminCategories (Delete) =================
    // ✅ PENDING
    builder.addCase(deleteMernAdminCategories.pending, (state) => {
      state.isLibraryLoading = true;
      state.libraryReject = false;
      state.libraryError = null;
    });
    // ✅ Success
    builder.addCase(deleteMernAdminCategories.fulfilled, (state, action) => {
      // console.log(state);
      state.isLibraryLoading = false;
      state.libraryCategory.adminGetCategory =
        state.libraryCategory.adminGetCategory.filter((ele) => {
          return ele._id !== action.payload.ids;
        });
    });
    // ✅ REJECTED
    builder.addCase(deleteMernAdminCategories.rejected, (state, action) => {
      state.isLibraryLoading = false;
      state.libraryReject = true;
      state.libraryError = action.payload || action.error.message;
    });

    // ================= getAddProduct (GET) =================
    // 🔄 Pending
    builder.addCase(getAddProduct.pending, (state) => {
      state.isLibraryLoading = true;
      state.Libraryreject = false;
      state.libraryError = null;
    });
    // ✅ Success
    builder.addCase(getAddProduct.fulfilled, (state, action) => {
      state.isLibraryLoading = false;
      state.Libraryreject = false;
      state.libraryBooks = action.payload;
    });
    // ❌ Error
    builder.addCase(getAddProduct.rejected, (state, action) => {
      state.isLibraryLoading = false;
      state.Libraryreject = true;
      state.libraryError = action.payload;
    });

    // ================= deleteProduct (Delete) =================
    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      state.isLibraryLoading = false;
      state.libraryBooks.productGet = state.libraryBooks.productGet.filter(
        (item) => {
          return item._id !== action.payload.id;
        }
      );
    });

    // ================= getSingle Or Multiple Images (GET) =================
    // 🔄 Pending
    builder.addCase(getSingleProductThunk.pending, (state) => {
      state.isLibraryLoading = true;
      state.Libraryreject = false;
      state.libraryError = null;
    });
    // ✅ Success
    builder.addCase(getSingleProductThunk.fulfilled, (state, action) => {
      state.isLibraryLoading = false;
      state.Libraryreject = false;
      state.singleProductData = action.payload.singleProduct;
      state.multipleImages = action.payload.multipleImages;
    });
    // ❌ Error
    builder.addCase(getSingleProductThunk.rejected, (state, action) => {
      state.isLibraryLoading = false;
      state.Libraryreject = true;
      state.libraryError = action.payload;
    });


    // getCartThunk
    // builder.addCase(getCartThunk.fulfilled, (state, action) => {
    //   state.cartData = action.payload.cartItems;
    // });
    builder.addCase(getCartThunk.pending, (state) => {
      state.cartLoading = true;
    })

    builder.addCase(getCartThunk.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartData = action.payload.cartItems;
    })

    builder.addCase(getCartThunk.rejected, (state) => {
      state.cartLoading = false;
    });


    // REMOVE SINGLE CART
    builder.addCase(removeCartThunk.fulfilled, (state, action) => {
      state.cartData = state.cartData.filter((item) => {
        return item._id !== action.meta.arg.cartId;
      });
    });

    // CLEAR ALL CART
    builder.addCase(clearCartThunk.fulfilled, (state) => {
      state.cartData = [];
    });


    // ORDER HISTORY
    builder.addCase(
      getOrderHistoryThunk.fulfilled,(state, action) => {
        state.orderHistory = action.payload.orders;
      }
    );



  },
});

export default library.reducer;
