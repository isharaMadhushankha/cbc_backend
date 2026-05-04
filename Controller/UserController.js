import Usermodel from "../model/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export function createUser(req,res){
    const hashpassword = bcrypt.hashSync(req.body.password,10);

    if(req.user==null){
        res.status(401).json({
            message:"please login and try again"
        })
        return;
    }
    if(req.user.role !== "admin"){
        res.status(403).json({
            message:"you are not allowed to create user"
        })
        return;
    }

    const user = new Usermodel({
        email:req.body.email,
        firstName:req.body.firstName,
        lastname:req.body.lastname,
        password:hashpassword,
        role:req.body.role || "user"
    })   

    user.save().then(()=>{
        res.json({
            message:"user added successfully"
        })
    }).catch(()=>{
        res.status(500).json({
            message:"failed to add user"
        })
    })
}

export function register(req, res) {
    const hashpassword = bcrypt.hashSync(req.body.password, 10);

    const user = new Usermodel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastname: req.body.lastname,
        password: hashpassword,
        role: "user" // Force role to user for public registration
    });

    user.save().then(() => {
        res.json({
            message: "Registration successful"
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Registration failed",
            error: err.message
        });
    });
}

export function login(req,res){
    Usermodel.findOne({
        email:req.body.email
    }).then((User)=>{
        if(User==null){
            res.status(401).json({
                message:"user not fount"
            })
        
        }else{
            const ispasswordmatching = bcrypt.compareSync(req.body.password,User.password)
            if(ispasswordmatching){
                const token = jwt.sign(
                    {
                        email:User.email,
                        firstName:User.firstName,
                        lastname:User.lastname,
                        role:User.role,
                        isEmailVerified:User.isEmailVerified
                    },process.env.JWT_SECRET
                )
                res.json({
                    message:"login successfully",
                    // Usermodel:User
                    token:token,
                    User:{
                        _id:User._id,
                        email:User.email,
                        firstName:User.firstName,
                        lastname:User.lastname,
                        role:User.role,
                        isEmailVerified:User.isEmailVerified,
                    }
                 })
            }
            else{
                res.status(403).json({
                    message:"login faild"
                })
            }
        }
    })
}




export function updateUser(req, res) {
    const userId = req.params.id;
    const updateData = {
        firstName: req.body.firstName,
        lastname: req.body.lastname,
        image: req.body.image,
        phone: req.body.phone,
        address: req.body.address
    };

    Usermodel.findByIdAndUpdate(userId, updateData, { new: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({
                message: "User updated successfully",
                User: {
                    _id: updatedUser._id,
                    email: updatedUser.email,
                    firstName: updatedUser.firstName,
                    lastname: updatedUser.lastname,
                    role: updatedUser.role,
                    isEmailVerified: updatedUser.isEmailVerified,
                    image: updatedUser.image,
                    phone: updatedUser.phone,
                    address: updatedUser.address
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to update user",
                error: err.message
            });
        });
}

export function isAdmin(req){
    if(req.user == null){
        return false
    }
    if(req.user.role != "admin"){
        return false
    }
    return true
}

export function iscustomer(req,res){
    if(res.user == null){
        return false
    }
    if(req.user.role != "user"){
        return
    }
    return true
}


export function getUser(req,res){
    if(req.user ==null){
        res.status(401).json({
            message:"please login and try again"
            
        })
    }else{
        res.json(req.user);
        console.log(req);
    }
}

export async function getAllUsers(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to view all users"
        });
        return;
    }
    try {
        const users = await Usermodel.find({}, { password: 0 }); // Exclude password
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: "Failed to retrieve users"
        });
    }
}

export async function toggleUserBlock(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Not authorized" });
    }

    try {
        const user = await Usermodel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Toggle the block status
        user.isblock = !user.isblock;
        await user.save();

        res.json({
            message: `User ${user.isblock ? "blocked" : "unblocked"} successfully`,
            isblock: user.isblock
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update user status",
            error: err.message
        });
    }
}

export async function changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    
    if (!req.user) {
        return res.status(401).json({ message: "Please login" });
    }

    try {
        const user = await Usermodel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = bcrypt.compareSync(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update password", error: error.message });
    }
}
