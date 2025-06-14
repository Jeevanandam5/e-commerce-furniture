import express from "express"
const router = express.Router();

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser } from "../controller/userController.js"

import { protect,admin } from "../middleware/authMiddleware.js";

router.get("/",protect, admin, getUsers);
router.post("/register",registerUser);
router.post("/logout", logoutUser);  
router.post("/login", authUser);   
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);  
router.route("/:id").delete(protect, admin,deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);  

export default router;