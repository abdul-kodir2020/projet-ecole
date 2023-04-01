import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Info from './Info'
import Vide from './Vide'

const Student = () => {
  return (
    <div className='studentBloc'>
      <Routes>
        <Route path='/' element={<Vide/>}/>
        <Route path='/student/:id' element={<Info/>}/>
      </Routes>
    </div>
  )
}


export const vide = () =>{
    return(
        <div>Sélectionner un étudiant</div>
    )
}

export default Student
