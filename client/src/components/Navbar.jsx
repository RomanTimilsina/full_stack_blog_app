import React, { useContext } from 'react'
import Logo  from '../img/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext)

    // console.log('current user:',currentUser)

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
            <Link to='/'>
                <img src={Logo} alt="" />
            </Link>
        </div>
        <div className="links">
                <Link className='link' to='/?cat=art' >ART</Link>
                <Link className='link' to='/?cat=science' >SCIENCE</Link>
                <Link className='link' to='/?cat=technology' >TECHNOLOGY</Link>
                <Link className='link' to='/?cat=cinema' >CINEMA</Link>
                <Link className='link' to='/?cat=design' >DESIGN</Link>
                <Link className='link' to='/?cat=food' >FOOD</Link>
                
        </div>
        <span className='name'>{currentUser?.username}</span>
        { currentUser ? 
        <span className='logout' onClick={() => logout()}>LOGOUT</span>
        :
        <Link className='link' to='/login'>LOGIN</Link>
        }
        <span className='write'>
             <Link to='/write' className='link'>WRITE</Link>
        </span>
      </div>
    </div>
  )
}

export default Navbar
