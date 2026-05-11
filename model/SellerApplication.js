import mongoose from "mongoose";

const sellerApplicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    brandName: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String, required: true },
    message: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    },
    createdAt: { type: Date, default: Date.now }
});

const SellerApplication = mongoose.model('SellerApplication', sellerApplicationSchema);
export default SellerApplication;
