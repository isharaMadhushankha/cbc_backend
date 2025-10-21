import express from "express";
import { createStudent, getStudent } from "../Controller/StudentController.js";
const StudentRouter = express.Router();


StudentRouter.post("/",createStudent);
StudentRouter.get("/",getStudent);

export default StudentRouter;
