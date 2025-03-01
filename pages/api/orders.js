import connectDb from "../../middleware/mongoose";
import Order from "@/models/Order";

const handler = async (req, res) => {
    if (req.method == "POST") {
        console.log(`✅ Route '${req.method} ${req.url}' was hit`);
        console.log("req body =>", req.body)
        const randomOrderId = parseInt(Math.random() * Date.now());
        const inputData = req.body
        // const newOrder = new Order({
        //     orderNumber: `ORD-2024-${randomOrderId}`,
        //     date: "2025-03-01T14:30:00.000Z",
        //     status: "order_placed",
        //     statusHistory: [
        //         {
        //             status: "order_placed",
        //             date: "2025-03-01T14:30:00.000Z"
        //         }
        //     ],
        //     total: totalPrice,
        //     items: Object.values(cart).map((item) => {
        //         return {
        //             id: "item-1",
        //             name: item.name,
        //             price: item.price,
        //             quantity: item.qty,
        //             image: "/dumbell.webp"
        //         }
        //     }),
        //     shippingAddress: {
        //         name: name,
        //         street: address || "456 Oak Avenue",
        //         city: "Los Angeles",
        //         state: "CA",
        //         zip: postalCode,
        //         country: "IND"
        //     },
        //     paymentMethod: "UPI",
        //     trackingNumber: "TRACK12346",
        //     estimatedDelivery: "2025-03-01T00:00:00.000Z"
        // });
        inputData.trackingNumber = `TRACK${randomOrderId}`
        console.log("input data =>", inputData)
        const newOrder = new Order(inputData)
        await newOrder.save();
        res.status(200).json({ success: true, order: newOrder });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default connectDb(handler);