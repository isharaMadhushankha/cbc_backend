import mongoose from "mongoose";

const SystemConfigSchema = new mongoose.Schema({
    siteName: {
        type: String,
        default: "Crystal Beauty Clear"
    },
    supportEmail: {
        type: String,
        default: "support@cbcbeauty.com"
    },
    siteDescription: {
        type: String,
        default: "Luxury beauty and skincare products."
    },
    shippingRate: {
        type: Number,
        default: 500
    },
    freeShippingThreshold: {
        type: Number,
        default: 10000
    },
    heroBanners: [{
        type: String // URLs to images
    }],
    middleAdBanner: {
        type: String,
        default: ""
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const SystemConfigModel = mongoose.model("SystemConfig", SystemConfigSchema);
export default SystemConfigModel;
