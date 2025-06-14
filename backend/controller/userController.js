import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userModel.js"
import jwt from "jsonwebtoken"


const authUser = asyncHandler(async(req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){


   const token = jwt.sign({userId:user._id}, "jknsakjsankajsnk", {expiresIn:"30d"});

    res.cookie("jwt", token, {
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    //   Set Jwt as http 

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token
        })
        
    }else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

    // res.send("Auth User");
})

const registerUser = asyncHandler(async(req, res) => {
    
    const {name, email, password} = req.body;

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error("User Already exist");
    }

    const user = await User.create({
        name, 
        email,
        password
    });

    if(user){

        const token = jwt.sign({userId:user._id}, "jknsakjsankajsnk", {expiresIn:"30d"});

        res.cookie("jwt", token, {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 30 * 24 * 60 * 60 * 10000
        })
        
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }

})

const logoutUser = asyncHandler(async(req, res) => {
    res.cookie("jwt", "", {
        httpOnly:true,
        expire: new Date(0)
    })

    res.status(200).json({message:"Logged out successfully"})
})

const getUserProfile = asyncHandler(async(req, res) => {
   
    const user = await User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }else {
        res.status(404);
        throw new Error("User not found");
    }


})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {

        const token = jwt.sign({userId:user._id}, "jknsakjsankajsnk", {expiresIn:"30d"});

        res.cookie("jwt", token, {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 30 * 24 * 60 * 60 * 10000
        })

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }

})

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.status(200).json({ message: "User deleted" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
}