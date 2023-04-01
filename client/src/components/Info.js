import React, { useContext, useEffect, useState } from 'react'
import { OneStudentContext, StudentContext } from '../context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';


const Info = () => {
    const {student,setStudent} = useContext(OneStudentContext) 
    const {students,setStudents} = useContext(StudentContext)
    const [show, setShow] = useState(false)
    const [showError, setShowError] = useState(false)
    const navigate = useNavigate()
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [age,setAge] = useState()


    useEffect(()=>{
        if (!student){
             navigate('/')
        }else{
            setName(student.name)
            setEmail(student.email)
            setAge(student.age)
        }
        setShow(false)
        
        setTimeout(()=>{
            setShow(true)
        },500)
        
    },[navigate, student])   


    const deleteStudent = () => {
        axios({
            method: 'delete',
            url: 'http://localhost:5000/students/delete-student/'+window.location.pathname.split('/')[2],
        }).then((response)=>{
            const newStudents = students.filter((student)=>student._id !== response.data)
            setStudents(newStudents)
            document.getElementById('close').click()
            navigate('/')
        })
            .catch((err) => console.log(err))
    }

    const updateStudent = ()=>{
        axios({
            method: 'put',
            url: "http://localhost:5000/students/update-student/"+window.location.pathname.split('/')[2],
            data: {
                name: name,
                email: email,
                age: age
            }
        })
        .then((response)=>{
            const newStudents = [...students]
            newStudents.filter((student)=> student._id === response.data._id)[0].name = response.data.name
            newStudents.filter((student)=> student._id === response.data._id)[0].email = response.data.email
            newStudents.filter((student)=> student._id === response.data._id)[0].age = response.data.age
            console.log(newStudents)
            setStudents(newStudents)
            setStudent(response.data)
            document.getElementById('close-put').click()

        })
        .catch((err)=>{
            console.log(err)
            setShowError(true)

            setTimeout(() => {
                setShowError(false)
            }, 1000);
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        updateStudent()
    }

    const scroll = () =>{
        document.querySelector(".content").scroll({
            top:0,
            left:0,
            behavior:'smooth'
        })
    }

    if (show) {
        return (
            <div className='p-5 d-flex blocInfo'>
              <img src={'https://robohash.org/'+student?._id+'?bgset=bg2&set=set4&size=250x250'} className='rounded shadow image' alt=''></img>
              <div className='mx-4 nfo'>
                <h2 className='mb-4'>{student?.name}</h2>
                <h3 className='mb-4'>{student?.email}</h3>
                <h3 className='mb-5'>{student?.age} ans</h3>
                <div>
                    <button type="button" class="btn btn-outline-secondary mb-2" data-bs-toggle="modal" data-bs-target="#modalSet"><i class="bi bi-pencil-square"></i>&nbsp;Modifier</button>&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger mb-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-trash3"></i>&nbsp;supprimer</button>
                </div>
              </div>
              <button type='button' className='btn btn-outline-dark btn-lg text-dark border-0 bg-transparent back' onClick={scroll}><i class="bi bi-arrow-left"></i>&nbsp;Liste</button>

              {/* modal delete */}
              <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-body h5">
                            Voulez-vous supprimer cet étudiant ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id='close'>non</button>
                            <button type="button" class="btn btn-danger" onClick={()=>deleteStudent()}>oui</button>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Modal put*/}
                <div class="modal fade" id="modalSet" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Modifier un étudiant</h1>
                                <button type="button" class="btn-close" id='close-put' data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div class="mb-3">
                                        <label for="exampleInputName" class="form-label">Nom et prénoms</label>
                                        <input type="text" class="form-control" id="exampleInputName" aria-describedby="nameHelp" value={name} onChange={(e)=>setName(e.target.value)} minLength={6} required/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Adresse email</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} pattern='^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$' required/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Age</label>
                                        <input type="number" class="form-control w-25" id="exampleInputPassword1" min={10} max={40} value={age} onChange={(e)=>setAge(e.target.value)} required/>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button type="submit" class="btn btn-secondary float-end">Modifier</button>
                                    </div>
                                    {(showError) ? <Alert variant="danger py-2 mt-3 text-center">
                                        Cette adresse email existe déjà
                                    </Alert>:null
                                    }
                                    {/* 
                                    {(showSuccess) ? <Alert variant="success py-2 mt-3 text-center">
                                        Etudiant ajouté
                                    </Alert>:null
                                    } */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )
    }else{
        return(
            <div className='w-100 d-flex justify-content-center mt-5 pt-5'>
                <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
          </div>
            </div>
        )

    }
  
}

export default Info
