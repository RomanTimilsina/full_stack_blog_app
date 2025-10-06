import React from 'react'
import Logo  from '../img/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
            <img src={Logo} alt="" />
        </div>
        <div className="links">
                <Link className='link' to='/?cat=art' >ART</Link>
                <Link className='link' to='/?cat=science' >SCIENCE</Link>
                <Link className='link' to='/?cat=technology' >TECHNOLOGY</Link>
                <Link className='link' to='/?cat=cinema' >CINEMA</Link>
                <Link className='link' to='/?cat=design' >DESIGN</Link>
                <Link className='link' to='/?cat=food' >FOOD</Link>
                
        </div>
        <span className='name'>JOHN</span>
        <span className='logout'>LOGOUT</span>
        <span className='write'>
             <Link to='/write' className='link'>WRITE</Link>
        </span>
      </div>
    </div>
  )
}

export default Navbar
