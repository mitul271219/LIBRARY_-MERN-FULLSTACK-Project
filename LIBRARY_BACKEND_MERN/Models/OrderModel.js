import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_Library -Data",
    },

    products: [
      {
        productId: {
              type: mongoose.Schema.Types.ObjectId,
               // PRODUCT MODEL NAME
               ref: "add_Products",
        },

        quantity: Number,
      },
    ],

    address: {
      fullName: String,
      mobile: String,
      city: String,
      state: String,
      pincode: String,
      addressLine: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "FAKE_ONLINE"],
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    totalPrice: Number,
  },
  {
    timestamps: true,
  }
);

orderSchema.pre(/^find/, function () {
    this.populate('products.productId');
});

const OrderModel = mongoose.model(
  "OrderModel",
  orderSchema
);

// populate("products.productId");

export default OrderModel;