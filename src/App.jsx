import React from 'react'
import Approutes from './routes/Approutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <Approutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
