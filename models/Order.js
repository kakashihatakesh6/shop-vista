import mongoose from "mongoose";

const StatusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  date: { type: Date, required: true },
});

const ItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

const ShippingAddressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["order_placed", "processing", "shipped", "out_for_delivery", "delivered"],
      required: true,
    },
    statusHistory: [StatusHistorySchema],
    total: { type: Number, required: true },
    items: [ItemSchema],
    shippingAddress: ShippingAddressSchema,
    paymentMethod: { type: String, required: true },
    trackingNumber: { type: String, required: true },
    estimatedDelivery: { type: Date, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Export the model
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
