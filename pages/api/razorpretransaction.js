import connectDb from "../../middleware/mongoose"
import Razorpay from "razorpay";

const handler = async (req, res) => {
  if (req.method == 'POST') {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZOR_KEY_Id,
        key_secret: process.env.RAZOR_KEY_SECRET,
      });
      // const orderId = Math.random() * Date.now();
      // const recieptt = `REC${parseInt(Math.random()*Date.now())}`;

      const options = {
        amount: 5000,
        currency: "INR",
        receipt: 'recieptt'
      };

      instance.orders.create(options, async (error, order) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ success: false, message: "Something went wrong!" })
        }
        return res.status(200).json({ success: true, data: order })
      })


    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Some error occured!" })
    }

  }
  else{
    return res.status(500).json({success: false, message: "Iternal Server Error!"})
  }
}

export default connectDb(handler);