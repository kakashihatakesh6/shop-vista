import connectDb from "../../middleware/mongoose"
import Razorpay from "razorpay";

const handler = async (req, res) => {
  if (req.method == 'POST') {
    try {
      const { amount, user, cart, totalPrice, paymentMethod, name, mobileNo, address, postalCode } = req.body.data;
      // console.log("req body =>", req.body, cart)
      const razorInstance = new Razorpay({
        key_id: process.env.RAZOR_KEY_Id,
        key_secret: process.env.RAZOR_KEY_SECRET,
      });

      const randomOrderId = parseInt(Math.random() * Date.now());
      // console.log("randomOrderId =>", randomOrderId)
      const options = {
        amount: totalPrice > 1000 ? totalPrice : totalPrice * 100,
        currency: "INR",
        receipt: `reciept_${Date.now()}`,
      };

      // razorInstance.orders.create(options, async (error, order) => {
      //   if (error) {
      //     console.log(error);
      //     return res.status(500).json({ success: false, message: "Something went wrong!" })
      //   }
      //   console.log("PreOrder Details =>", order);
        

      //   const newOrder = new Order({
      //     orderNumber: `ORD-2024-${randomOrderId}`,
      //     date: "2025-03-01T14:30:00.000Z",
      //     status: "order_placed",
      //     statusHistory: [
      //       {
      //         status: "order_placed",
      //         date: "2025-03-01T14:30:00.000Z"
      //       }
      //     ],
      //     total: totalPrice,
      //     items: Object.values(cart).map((item) => {
      //         return {
      //           id: "item-1",
      //           name: item.name,
      //           price: item.price,
      //           quantity: item.qty,
      //           image: "/dumbell.webp"
      //         }
      //       }),
      //     shippingAddress: {
      //       name: name,
      //       street: address || "456 Oak Avenue",
      //       city: "Los Angeles",
      //       state: "CA",
      //       zip: postalCode,
      //       country: "IND"
      //     },
      //     paymentMethod: "UPI",
      //     trackingNumber: "TRACK12346",
      //     estimatedDelivery: "2025-03-01T00:00:00.000Z"
      //   })

      //   console.log("New Order =>", newOrder)
      //   const dbOrder = await newOrder.save();
      //   return res.status(200).json({ success: true, data: dbOrder })
      // })

      const preOrder = await razorInstance.orders.create(options);
      // console.log("preorder =>", preOrder);
      return res.status(200).json({success: true, data: preOrder});

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