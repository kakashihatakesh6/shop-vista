import connectDb from "../../middleware/mongoose";
import Forgot from "../../models/Forgot";
import User from "../../models/User";
const nodemailer = require("nodemailer");
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    // Function to send verification email to user
    const sendVerificationEmail = async (email, verificationToken) => {
        try {
            // create a nodemailer transport
            const transporter = nodemailer.createTransport({
                // configure the email transport
                host: process.env.NEXT_PUBLIC_HOST,
                service: "gmail",
                secure: true,
                auth: {
                    user: "nkdasar@gmail.com",
                    pass: process.env.MAILER_PASS,
                },
            });

            let verificationMail = `We have sent you this email in response to your request to reset your password on Codeswear.com 
                <br/><br/>
                To reset your password, please follow the link below:
                <a href="${process.env.NEXT_PUBLIC_HOST}/forgot?token=${verificationToken}">Click here to reset your password</a>
                <br/><br/>
                We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.`

            // compose the email message
            const mailOptions = {
                from: "wearme.com",
                to: email,
                subject: "Email verification ✔",
                html: verificationMail
            }

            // Send the mail to user 
            await transporter.sendMail(mailOptions);
            return { success: true }
        }
        catch (error) {
            res.status(400).json({ error: "Error sending verification email" })
        }

    }

    // Send an email to the user
    if (req.method == "POST") {
        if (req.body.sendMail) {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                try {
                    let verificationToken = `${Math.random() * Date.now()}`;
                    let forgot = new Forgot({
                        email: user.email,
                        userId: user._id,
                        verificationToken: verificationToken
                    })

                    const sendingEmail = await sendVerificationEmail(user.email, verificationToken);
                    if (sendingEmail.success) {
                        await forgot.save();
                    }
                    console.log("data", sendingEmail)
                    res.status(200).json({ success: true, message: "Verification email successfully sent" });

                } catch (error) {
                    res.status(400).json({ error: "Error sending verification email" })
                }

            }
        }
        else {
            try {
                const { verificationToken, password, cpassword } = req.body;
                let user = await Forgot.findOne({ verificationToken: verificationToken });
                console.log("user =>", user);
                if (!user) {
                    res.status(400).json({ success: false, message: "Some error occurred" });
                }
                let newPass = CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString();
                let dbuser = await User.findOneAndUpdate({ _id : user.userId }, { password: newPass });
                // let userToken = await Forgot.findOne({ verificationToken: verificationToken });
                // userToken.verified = true;
                // userToken.verificationToken = undefined;
                // await userToken.save();
                res.status(200).json({ status: true, message: "Password changed successfully" });

            } catch (error) {
                res.status(400).json({ status: false, message: "Some error occureed!" });
            }

        }

    }
}

export default connectDb(handler);