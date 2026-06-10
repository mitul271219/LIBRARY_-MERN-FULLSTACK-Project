import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      // USER MODEL NAME
      ref: "user_Library -Data",
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      // PRODUCT MODEL NAME
      ref: "add_Products",
    },

    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre(/^find/, function () {
    this.populate('productId');
});

const CartModel = mongoose.model(
  "CartModel",
  cartSchema
);

export default CartModel;