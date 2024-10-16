import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }
)


const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [orderItemSchema],
        orderDate: { type: Date, default: Date.now },
        paymentStatus: { type: String, enum: ['pending', 'paid', 'filed'], required: true },
        paymentMethod: { type: String, enum: ['credit_card', 'UPI', 'cash_on_delivery'], required: true },
        shippingAddress: {
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            zipCode: { type: String, required: true },
            phoneNumber: {
                type: Number, required: true,
                validate: {
                    validator: function (v) {
                        return  /^(?:(?:\+91|0)?[7-9][0-9]{9})$/.test(v);
                    },
                    message: props => `${props.value} is not a valid Phone Number!`
                }
            }
        },
        orderStatus: { type: String, enum: ['pending', 'shipped', 'delivered', 'canceled'], required: true },
        deliveryDate: { type: Date },
        trackingNumber: { type: String },
        totalAmount: { type: Number, required: true }
    }
)

export default mongoose.model('Order', orderSchema)