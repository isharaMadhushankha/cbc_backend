import express from "express";
import { getConfig, updateConfig } from "../Controller/SystemConfigController.js";

const SystemConfigRouter = express.Router();

// Public can view basic config (site name, description)
SystemConfigRouter.get("/", getConfig);

// Only admin can update
SystemConfigRouter.put("/", updateConfig);

export default SystemConfigRouter;
