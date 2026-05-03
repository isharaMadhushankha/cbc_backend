import express from "express"
import { createUser, getAllUsers, getUser, login, register } from "../Controller/UserController.js";

const UserRouter = express.Router();

UserRouter.post("/",register);
UserRouter.post("/register",register);
UserRouter.post("/login",login);
UserRouter.get("/me",getUser);
UserRouter.get("/all", getAllUsers);

export default UserRouter;