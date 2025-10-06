import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form className='form'>
        <input required type="text" placeholder='username' />
        <input required type="email" placeholder='email' />
        <input required type="password" placeholder='password' />
        <p>There is an error</p>
        <button type='submit'>Register</button>
        <div>
            <span>Already have an account?</span>
            <Link to='/login' className='link'>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
