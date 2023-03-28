const { getStudents, setStudent, editStudent, deleteStudent } = require("../controllers/students.controller")

const router = require("express").Router()

router.get('/', getStudents)

router.post('/create-student',setStudent)

router.put('/update-student/:id', editStudent)

router.delete('/delete-student/:id', deleteStudent)

module.exports = router