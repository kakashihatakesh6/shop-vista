import User from "../../models/User";
import connectDb from '../../middleware/mongoose'
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    
    if (req.method == "POST") {
        console.log("bodddd", req.body)
        let user = await User.findOne({ email: req.body.data.email });
        var bytes = CryptoJS.AES.decrypt(user.password, 'secret123');
        var decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (req.body.data.email == user.email && req.body.data.password == decryptedPass) {
                const token = jwt.sign({ name: user.name, email: user.email }, 'jwttoken', {expiresIn: "2d"});
                res.status(200).json({ success: true, token: token, myUser: user });
            }
            else {
                res.status(400).json({ success: false, error: "Invalid Credentials" })
            }
        }
        else {
            res.status(400).json({ success: false, error: "No user found" })
        }

    }
    else {
        res.status(400).json({ error: "This method is not allowed" });   
    }
}

export default connectDb(handler); 