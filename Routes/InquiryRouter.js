import express from "express";
import { createInquiry, getAllInquiries, updateInquiryStatus } from "../Controller/InquiryController.js";

const InquiryRouter = express.Router();

InquiryRouter.post("/", createInquiry);
InquiryRouter.get("/all", getAllInquiries);
InquiryRouter.put("/status/:id", updateInquiryStatus);

export default InquiryRouter;
