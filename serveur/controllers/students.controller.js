const Students = require("../models/student.model")

const joi = require("joi")

const schemaAdd = joi.object(
    {
        name: joi.string().min(5).required(),
        age: joi.string().min(2).required(),
        class: joi.string().min(5).required(),
        phone_number: joi.string().min(8).required()

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

module.exports.setStudent = async (req, res) => {
    const {error} = schemaAdd.validate(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    const phone_number_exist = await Students.findOne({phone_number: req.body.phone_number})
    if (phone_number_exist) return res.status(400).json("Le numéro de téléphone existe déjà")

    const student = new Students({
        name: req.body.name,
        age: req.body.age,
        class: req.body.class,
        phone_number: req.body.phone_number
    })

    try {
        await student.save()
        res.status(200).json({student: student.id})
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports.editStudent = async (req, res) => {
    const student = await Students.findById(req.params.id)
    if (!student) return res.status(400).json("Cet étudiant n'existe pas")
    
    const {error} = schemaAdd.validate(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    
        const updateStudent = Students.updateOne(
            {_id: req.params.id},
            req.body,
            {upsert: true}
        )
        res.status(200).send(error)
    
   
}


module.exports.deleteStudent = async (req, res) => {
    const student = await Students.findById(req.params.id)
    if (!student) return res.status(400).json("Cet étudiant n'existe pas")

    await student.deleteOne()
    res.status(200).json("etudiant supprimé : "+req.params.id)
}

