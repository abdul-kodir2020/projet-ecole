import React,{useContext, useState} from 'react'
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'
import { StudentContext } from '../context';

const ButtonAdd = () => {
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [age,setAge] = useState()
  const [show,setShow] = useState(false)
  const [showSuccess,setShowSuccess] = useState(false)
  const [error, setError] = useState("")
  const {students,setStudents} = useContext(StudentContext)


  const addStudent = async() =>{
    await axios({
      method: 'post',
      url: "http://localhost:5000/students/create-student",
      data: {
        name: name,
        age: age,
        email: email
      }
    }).then((reponse)=>{
      const newStudents = [reponse.data.student,...students]
      setStudents(newStudents)
      setAge("")
      setEmail("")
      setName("")
      setShowSuccess(true)
      setTimeout(()=>{
        setShowSuccess(false)
        document.querySelector(".btn-close").click()
      },1000)
    }).catch((err)=>{
      setError(err.response.data)
      setShow(true)
      setTimeout(()=>{
        setShow(false)
      },3000)
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    addStudent()
  }

  return (
    <div className='BlocAdd'>
      <button type="button" className="btn btn-outline-dark w-75 fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal"><span className="bi-plus-square-fill"></span>&nbsp;&nbsp;Ajouter un étudiant</button>
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">Ajouter un étudiant</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label for="exampleInputName" className="form-label">Nom et prénoms</label>
                  <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" value={name} onChange={(e)=>setName(e.target.value)} minLength={7} required/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">Adresse email</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} pattern='^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$' required/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Age</label>
                  <input type="number" className="form-control w-25" id="exampleInputPassword1" min={10} value={age} onChange={(e)=>setAge(e.target.value)} required/>
                </div>
                <div className='d-flex justify-content-end'>
                  <button type="submit" className="btn btn-primary float-end">Ajouter</button>

                </div>
                {(show) ? <Alert variant="danger py-2 mt-3 text-center">
                    {error}
                </Alert>:null
                  }
                  {(showSuccess) ? <Alert variant="success py-2 mt-3 text-center">
                    Etudiant ajouté
                </Alert>:null
                  }
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  )
}

export default ButtonAdd
