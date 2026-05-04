import InquiryModel from "../model/Inquiry.js";

export async function createInquiry(req, res) {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newInquiry = new InquiryModel({
            name,
            email,
            message
        });

        await newInquiry.save();
        
        res.status(201).json({
            message: "Inquiry sent successfully. We will get back to you soon!",
            inquiry: newInquiry
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to send inquiry",
            error: error.message
        });
    }
}

export async function getAllInquiries(req, res) {
    try {
        const inquiries = await InquiryModel.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve inquiries",
            error: error.message
        });
    }
}

export async function updateInquiryStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const updatedInquiry = await InquiryModel.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );
        
        if (!updatedInquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        
        res.json({
            message: "Inquiry status updated",
            inquiry: updatedInquiry
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update inquiry",
            error: error.message
        });
    }
}
