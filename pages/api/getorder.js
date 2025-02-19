import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";

const handler = async(req, res) => {
    if (req.method === "GET") {
        const itemSlug = req.query.slug;
        console.log("Slug =>",itemSlug)
        try {
            const order = await Order.findOne({_id: itemSlug});
            console.log("Order =>", order);
            res.status(200).json({success: true, order: order});
        } catch (error) {
            res.status(500).json({success: false, message: "Internal Sever Error"})
        }
        
        
    }
}

export default connectDb(handler);