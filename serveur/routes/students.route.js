const { getStudents, setStudent, editStudent, deleteStudent, getOneStudent } = require("../controllers/students.controller")

const router = require("express").Router()


router.get('/', getStudents)

router.get('/update-student/:id', getOneStudent)

router.post('/create-student',setStudent)

router.put('/update-student/:id', editStudent)

router.delete('/delete-student/:id', deleteStudent)

module.exports = router