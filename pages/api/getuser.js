import connectDb from '../../middleware/mongoose'
import User from "../../models/User";
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {

    if (req.method == "POST") {
        let jwtToken = req.body.token;
        let user = jwt.verify(jwtToken, 'jwttoken');
        let dbuser = await User.findOne({email: user.email})
        const {name, email, address, pincode, phone} = dbuser;
        res.status(200).json({ name, email, phone, address, pincode })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default connectDb(handler); 