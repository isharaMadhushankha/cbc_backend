import SystemConfigModel from "../model/SystemConfig.js";

export async function getConfig(req, res) {
    try {
        let config = await SystemConfigModel.findOne();
        
        // If no config exists, create the default one
        if (!config) {
            config = new SystemConfigModel();
            await config.save();
        }
        
        res.json(config);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve configuration",
            error: error.message
        });
    }
}

export async function updateConfig(req, res) {
    try {
        // Check if user is admin (assuming isAdmin middleware or check)
        if (req.user?.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updateData = req.body;
        updateData.updatedAt = Date.now();

        let config = await SystemConfigModel.findOneAndUpdate({}, updateData, { 
            new: true, 
            upsert: true // Create if not exists
        });

        res.json({
            message: "Configuration updated successfully",
            config
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update configuration",
            error: error.message
        });
    }
}
