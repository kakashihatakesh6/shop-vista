import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose"
import Razorpay from "razorpay";

const handler = async (req, res) => {
  if (req.method == 'POST') {
    try {
      const { amount, user, cart, totalPrice, paymentMethod, name, mobileNo, address, postalCode } = req.body.data;
      console.log("req body =>", req.body)
      const instance = new Razorpay({
        key_id: process.env.RAZOR_KEY_Id,
        key_secret: process.env.RAZOR_KEY_SECRET,
      });


      // const orderId = Math.random() * Date.now();
      // const recieptt = `REC${parseInt(Math.random()*Date.now())}`;
      const randomOrderId = parseInt(Math.random() * Date.now());
      console.log("randomOrderId =>", randomOrderId)
      const options = {
        amount: 5000,
        currency: "INR",
        receipt: 'order_123',
      };

      instance.orders.create(options, async (error, order) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ success: false, message: "Something went wrong!" })
        }
        console.log("PreOrder Details =>", order);
        const newOrder = new Order({
          user: user,
          products: Object.values(cart).map((item) => {
            return {
              name: item.name,
              quantity: item.qty,
              price: item.price,
              size: item.size,
              color: item.variant
            }
          }),
          totalPrice: totalPrice,
          shippingAddress: {
            name: name,
            mobileNo: mobileNo,
            address: address,
            postalCode: postalCode
          },
          paymentMethod: paymentMethod,
        })
        console.log("New Order =>", newOrder)
        await newOrder.save();
        return res.status(200).json({ success: true, data: order })
      })


    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Some error occured!" })
    }

  }
  else {
    return res.status(500).json({ success: false, message: "Iternal Server Error!" })
  }
}

export default connectDb(handler);