// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose"
import Order from "../../models/Order"

const handler = async (req, res) => {

    if (req.method === 'GET') {
        let userId = req.query.userId;

        let orders = await Order.find({user: userId});
        if (!orders) {
            res.status(500).json({ success: false, message: "Internal Server Error!" })
        }

        res.status(200).json({ success: true, orders: orders })
    }
}

export default connectDb(handler);