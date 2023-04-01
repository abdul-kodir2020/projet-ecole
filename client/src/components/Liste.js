import React,{useContext, useEffect} from 'react'
import axios from 'axios'
import { OneStudentContext, StudentContext } from '../context'
import {useNavigate } from 'react-router-dom'

const Liste = () => {
  const {students,setStudents} = useContext(StudentContext)
  const {setStudent} = useContext(OneStudentContext)
  const navigate = useNavigate()
  useEffect(()=>{
    const getStudents = async() =>{
      await axios.get("http://localhost:5000/students")
      .then((reponse)=>{
        setStudents(reponse.data.students.reverse())
      })
      .catch((err)=>console.log(err))
    }
    getStudents()
  },[setStudents])

  const handleClick = async (e) =>{
    e.preventDefault()
    await axios.get(`http://localhost:5000/students/update-student/${e.target.name}`)
            .then((reponse) => {
              setStudent(reponse.data);
              console.log(reponse.data);
              navigate(`/student/${e.target.name}`)
              document.querySelector(".content").scroll({
                top: 0,
                left:500,
                behavior: 'smooth'
              });
            })
            .catch((err)=> console.log(err))
  }
  return (
    <div className='Liste p-4 pb-0 d-flex flex-column '>
      <h5>Liste des étudiants</h5>
      <hr/>
      {(students.length === 0)? <h6 className='text-center'>Ajoutez un étudiant</h6>:null}
      {students?.map((student)=>(
        <button type="button" key={student._id} className={"btn btn-outline-dark text-start mb-3 fw-bold "+((window.location.pathname.split('/')[2] === student._id)?"active":"")} name={student._id} onClick={(e)=>handleClick(e)}>{student.name}</button>
      ))}
      <hr/>
      <h6 className='text-center'>{students.length} étudiant{(students.length < 2 ?"":"s")}</h6>
    </div>
  )
}

export default Liste
