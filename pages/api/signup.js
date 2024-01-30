import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == "POST") {
        const {name, email} = req.body;

        const ciphertext = CryptoJS.AES.encrypt(req.body.password, 'secret123').toString();

        let newUser = new User({name, email, password: ciphertext});
        let token = jwt.sign({name: name, email: email}, 'jwttoken', {expiresIn: "2d"});

        console.log(req.body)

        await newUser.save();
        res.status(200).json({ success: true, token: token, myUser: newUser });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default connectDb(handler);