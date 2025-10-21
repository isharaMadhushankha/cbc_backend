import Usermodel from "../model/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){
const hashpassword = bcrypt.hashSync(req.body.password,10);

 const authHeader = req.headers.authorization;
 console.log(authHeader);

    console.log(req.user);
    if(req.user==null){
        res.status(401).json({
            message:"please login and try again"
        })
    }
    if(req.user.role !== "admin"){
        res.status(403).json({
            message:"you are not allowd to create student"
        })
        return
    }

    const user = new Usermodel({
        email:req.body.email,
        firstName:req.body.firstName,
        lastname:req.body.lastname,
        password:hashpassword,
        role:req.body.role
    
    }
        
    )   
   

    user.save().then(()=>{
        res.json({
            message:"user add succesfully",
         
            
        })
    }).catch(()=>{
        res.json({
            message:"user add not successfully"
        })
    })

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
                    },"jwt-secret"
                )
                res.json({
                    message:"login successfully",
                    // Usermodel:User
                    token:token
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