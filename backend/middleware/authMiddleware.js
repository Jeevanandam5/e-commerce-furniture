import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../model/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;
    
    // Read token from cookies
    token = req.cookies.jwt;
    
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "jknsakjsankajsnk");
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as admin");
    }
};

export { protect, admin };