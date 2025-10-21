import express from "express"
import { createUser, login } from "../Controller/UserController.js";

const UserRouter = express.Router();

UserRouter.post("/",createUser);
UserRouter.post("/login",login);
// UserRouter.get("/",getUsers);


export default UserRouter;