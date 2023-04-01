import React, { useMemo, useState } from 'react'
import BlocListe from './components/BlocListe'
import Student from './components/Student'
import { OneStudentContext, StudentContext } from './context'
import './App.css';


function App() {
  const [student, setStudent] = useState()
  const value = useMemo(()=>({student, setStudent}),[student])

  const [students,setStudents] = useState([])
  const value1 = useMemo(()=>({students,setStudents}),[students])
  return (
    <div className='App'>
      <div className='content bg-light shadow rounded d-flex'>
        <OneStudentContext.Provider value={value}>
        <StudentContext.Provider value={value1}>
          <BlocListe/>
          <Student/>
          </StudentContext.Provider>
        </OneStudentContext.Provider>
        
      </div>
    </div>
  )
}


export default App;
