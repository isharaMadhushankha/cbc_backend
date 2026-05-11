import express from "express";
import { 
    sendMessage, 
    getConsultation, 
    getAllConsultations, 
    closeConsultation 
} from "../Controller/ConsultationController.js";

const ConsultationRouter = express.Router();

ConsultationRouter.post("/send", sendMessage);
ConsultationRouter.get("/my", getConsultation);
ConsultationRouter.get("/admin/all", getAllConsultations);
ConsultationRouter.get("/admin/:userId", getConsultation);
ConsultationRouter.put("/admin/close/:userId", closeConsultation);

export default ConsultationRouter;
