import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './AdminLogIn.css'


function AdminLogIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const submitLogIn = () => {
    if (!email || !password) {
      setError("email and password are required")
    } else {
      const data = {
        email,
        password
      }
      axios.post('http://localhost:9000/admin/login', data).then((response) => {
        localStorage.setItem("adminData", JSON.stringify(response.data.token))
        navigate('/adminHome')
      }).catch((error) => {
        setError("Invalid Email or Password!")
      })
    }
  }
  return (
    <div>
      <div className='outer-div'>
        <h1 className='login-label'>LOG IN</h1>
        <h6>(Admin)</h6>
        <p className='error'>{error}</p>
        <Form.Control type="email" placeholder="Email" className='input-box' onChange={(e) => setEmail(e.target.value)} />
        <Form.Control type="password" placeholder="Password" className='input-box' onChange={(e) => setPassword(e.target.value)} />
        <Button className='login-button' onClick={submitLogIn}>Log In</Button>

      </div>
    </div>
  )
}

export default AdminLogIn