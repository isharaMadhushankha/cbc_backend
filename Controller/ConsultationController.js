import ConsultationModel from "../model/Consultation.js";
import Usermodel from "../model/UserSchema.js";

export const sendMessage = async (req, res) => {
    try {
        const { message, userId: targetUserId } = req.body;
        const currentUser = req.user;

        if (!currentUser) {
            return res.status(401).json({ message: "Login required" });
        }

        // The token might not have _id, so we find the user by email if needed
        let userId = currentUser._id;
        if (!userId && currentUser.email) {
            const fullUser = await Usermodel.findOne({ email: currentUser.email });
            if (fullUser) userId = fullUser._id;
        }

        // If admin is sending, use targetUserId from body.
        if (currentUser.role === "admin" && targetUserId) {
            userId = targetUserId;
        }
        
        if (!userId) return res.status(404).json({ message: "User identity not found" });

        let consultation = await ConsultationModel.findOne({ userId });

        if (!consultation) {
            // Only user can initiate first time or admin if they have targetUserId
            const user = await Usermodel.findById(userId);
            if (!user) return res.status(404).json({ message: "User not found" });

            consultation = new ConsultationModel({
                userId: user._id,
                userName: `${user.firstName} ${user.lastname}`,
                userEmail: user.email,
                messages: []
            });
        }

        const newMessage = {
            sender: currentUser.role === "admin" ? "admin" : "user",
            message,
            timestamp: new Date()
        };

        consultation.messages.push(newMessage);
        consultation.lastMessageAt = new Date();
        consultation.status = "active";
        
        await consultation.save();
        res.status(200).json(consultation);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getConsultation = async (req, res) => {
    try {
        const currentUser = req.user;
        if (!currentUser) return res.status(401).json({ message: "Login required" });

        let userId = currentUser._id;
        if (!userId && currentUser.email) {
            const fullUser = await Usermodel.findOne({ email: currentUser.email });
            if (fullUser) userId = fullUser._id;
        }

        if (currentUser.role === "admin" && req.params.userId) {
            userId = req.params.userId;
        }

        if (!userId) return res.status(200).json({ messages: [] });

        const consultation = await ConsultationModel.findOne({ userId });
        
        if (!consultation) {
            return res.status(200).json({ messages: [] });
        }

        res.status(200).json(consultation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllConsultations = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const consultations = await ConsultationModel.find().sort({ lastMessageAt: -1 });
        res.status(200).json(consultations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const closeConsultation = async (req, res) => {
    try {
        const { userId } = req.params;
        await ConsultationModel.findOneAndUpdate({ userId }, { status: "closed" });
        res.status(200).json({ message: "Consultation closed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
