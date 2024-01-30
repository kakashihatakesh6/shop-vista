import connectDb from "../../middleware/mongoose"
import crypto from 'crypto'

const handler = (req, res) => {
    if (req.method == 'POST') {
        try {

            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderID } = req.body;
            const sign = razorpay_order_id + '|' + razorpay_payment_id;
            
            console.log("Imhitting =>", req.body)
            // const expectedSign = crypto
            //     .createHmac('sha256', process.env.RAZOR_KEY_SECRET)
            //     .update(sign.toString()).digest('hex');
            const expectedSign = crypto
                .createHmac('sha256', process.env.RAZOR_KEY_SECRET).update(sign.toString()).digest('hex');

            // const generated_signature = hmac_sha256(orderId + "|" + razorpay_payment_id, process.env.Razor_key_secret);
            console.log("gen =>", expectedSign);

            if (razorpay_signature === expectedSign) {
                return res.status(200).json({ message: "Payment Verified Successfully!" });
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