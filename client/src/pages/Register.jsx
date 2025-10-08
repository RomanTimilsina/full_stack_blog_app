import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
    const [inputs, setInputs] = useState({
        username:"",
        email: "",
        password: ""})
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:8800/api/auth/register", inputs)
            console.log("Registration success:", res.data)
            navigate("/login")
        } catch(err) {
            setError(err)
            console.log(err)
        } 
    }
// ,
//   "proxy": "http://localhost:8800/api/"
    // console.log(inputs)
    
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form className='form'>
        <input required type="text" placeholder='username' name='username' onChange={handleChange} />
        <input required type="email" placeholder='email' name='email' onChange={handleChange} />
        <input required type="password" placeholder='password' name='password' onChange={handleChange} />
        {error && <p>{error.message}</p>}
        <button type='submit' onClick={handleSubmit}>Register</button>
        <div>
            <span>Already have an account?</span>
            <Link to='/login' className='link'>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
