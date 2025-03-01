import connectDb from "../../middleware/mongoose"
import crypto from 'crypto'

const handler = (req, res) => {
    if (req.method == 'POST') {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            console.log("Im hitting =>", req.body)

            const sign = razorpay_order_id + '|' + razorpay_payment_id;
            
            const expectedSignature = crypto
                .createHmac('sha256', process.env.RAZOR_KEY_SECRET)
                .update(sign.toString())
                .digest('hex');

            console.log("expected signature, razorpay signature =>", expectedSignature, razorpay_signature);
            const razorData = {razorpay_order_id, razorpay_payment_id, razorpay_signature}

            if (razorpay_signature === expectedSignature) {
                return res.status(200).json({ success: true, data: razorData, message: "Payment Verified Successfully!" });
            } else {
                return res.status(400).json({ message: 'Invalid Signature sent!' });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Some error occured!" })
        }
    }
    else {
        res.status(500).json({ success: false, message: "Some error occured!" })
    }
}

export default connectDb(handler);