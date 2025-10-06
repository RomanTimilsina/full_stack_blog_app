import React from 'react'
import '../style.scss'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='auth'>
      
      <form className='form'>
        <h1>Login</h1>
        <input required type="text" placeholder='username' />
        <input required type="password" placeholder='password' />
        <p>There is an error</p>
        <button type='submit'>Login</button>
        <div>
            <span>Don't have an account?</span>
            <Link to='/register' className='link'>Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
