import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ["user", "admin"],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ConsultationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    messages: [MessageSchema],
    lastMessageAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["active", "closed"],
        default: "active"
    }
});

const ConsultationModel = mongoose.model("Consultation", ConsultationSchema);
export default ConsultationModel;
