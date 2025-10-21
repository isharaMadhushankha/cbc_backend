import Student from "../model/StudentSchema.js";

export function getStudent(req,res){
    console.log("get request is resuved");

    Student.find().then((data)=>{
        res.json(data)
    }).catch(()=>{
        message:"Canot find"
    })

}

export function createStudent(req,res){
    console.log("post request is recived");

    
    const student = new Student({
        name:req.body.name,
        age:req.body.age,
        city:req.body.city
    });

    student.save().then(()=>{
        res.json({
            message:"success"
        })
    }).catch(()=>{
            res.json({
                message:"not success"
            })
     })
}


