const Students = require("../models/student.model")

const joi = require("joi")

const schemaAdd = joi.object(
    {
        name: joi.string().min(7).required(),
        age: joi.string().min(2).required(),
        email: joi.string().min(7).required()

    }
)

module.exports.getStudents = async (req,res) => {
    try {
        const students = await Students.find()
        res.status(200).json({students: students})
        
    } catch (err) {
        res.status(400).json({message: err})
    }
    
}

module.exports.getOneStudent = async (req, res) => {
    try {
        const student = await Students.findOne({_id: req.params.id})

        res.status(200).json(student)
    } catch (err) {
        res.status(400).json("there is an error : "+err)
    }
}

module.exports.setStudent = async (req, res) => {
    const {error} = schemaAdd.validate(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    const email_exist = await Students.findOne({email: req.body.email})
    if (email_exist) return res.status(400).json("L'adresse email existe déjà")

    const student = new Students({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    })

    try {
        await student.save()
        res.status(200).json({student: student})
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports.editStudent = async (req, res) => {
    const student = await Students.findById(req.params.id)
    if (!student) return res.status(400).json({error:"Cet étudiant n'existe pas"})

    const isEmail = await Students.findOne({email: req.body.email})
    if(isEmail){
        if(req.body.email != student.email){
            return res.status(400).json({error:"Cette adresse email existe déjà"}) 
        } 
    }

    const {error} = schemaAdd.validate(req.body)
    if (error) return res.status(400).json({error:error.details[0].message})

    try {
        const updateStudent = await Students.findByIdAndUpdate(
            student,
            req.body,
            {new: true}
        )
        res.status(200).send(updateStudent)
    } catch (err) {
        res.status(400).json("there is an error : " + err)
    }   
}


module.exports.deleteStudent = async (req, res) => {
    const student = await Students.findById(req.params.id)
    if (!student) return res.status(400).json("Cet étudiant n'existe pas")

    await student.deleteOne()
    res.status(200).json(req.params.id)
}

