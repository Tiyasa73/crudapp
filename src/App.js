import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Show from './Components/Show'
import Add from './Components/Add'
import UpdateProduct from './Components/UpdateProduct'
const App = () => {
  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<Show/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/update/:id' element={<UpdateProduct/>}/>
          
        </Routes>       
      </Router>

    </>
  )
}

export default App

