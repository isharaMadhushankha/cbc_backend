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