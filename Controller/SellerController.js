import SellerApplication from "../model/SellerApplication.js";

export const submitApplication = async (req, res) => {
    try {
        const newApp = new SellerApplication(req.body);
        await newApp.save();
        res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getApplications = async (req, res) => {
    try {
        const apps = await SellerApplication.find().sort({ createdAt: -1 });
        res.status(200).json(apps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await SellerApplication.findByIdAndUpdate(id, { status });
        res.status(200).json({ message: `Application ${status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
