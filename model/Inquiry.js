import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending", // pending, resolved, etc.
        enum: ["pending", "resolved", "in-progress"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const InquiryModel = mongoose.model("Inquiry", InquirySchema);
export default InquiryModel;
