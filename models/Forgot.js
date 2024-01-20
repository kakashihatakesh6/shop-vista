const mongoose = require('mongoose');

const ForgotSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    verificationToken: { type: String, required: true },
    verified: {type: Boolean, default: false},
}, { timestamps: true });

// mongoose.models = {}
// export default mongoose.model("User", UserSchema);
export default mongoose.models.Forgot || mongoose.model("Forgot", ForgotSchema);