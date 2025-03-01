import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";

const handler = async(req, res) => {
    if (req.method === "GET") {
        const {orderId} = req.query;
        console.log("orderId =>",orderId)
        try {
            const order = await Order.findOne({orderId});
            console.log("Order =>", order);
            res.status(200).json({success: true, order: order});
        } catch (error) {
            res.status(500).json({success: false, message: "Internal Sever Error"})
        }
        
        
    }
}

export default connectDb(handler);