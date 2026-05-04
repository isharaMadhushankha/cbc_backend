import express from "express"
import { changePassword, createUser, getAllUsers, getUser, login, register, toggleUserBlock, updateUser } from "../Controller/UserController.js";

const UserRouter = express.Router();

UserRouter.post("/",register);
UserRouter.post("/register",register);
UserRouter.post("/login",login);
UserRouter.put("/:id", updateUser);
UserRouter.get("/me",getUser);
UserRouter.get("/all", getAllUsers);
UserRouter.put("/block/:id", toggleUserBlock);
UserRouter.put("/change-password/me", changePassword);

export default UserRouter;