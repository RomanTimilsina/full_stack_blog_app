import React from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'

const Single = () => {
  return (
    <div className="single">
        <div className="contents">
            <img src="https://images.pexels.com/photos/34112204/pexels-photo-34112204.jpeg" alt="" />
            <div className="user">
                <img src="https://images.pexels.com/photos/34112204/pexels-photo-34112204.jpeg" alt="" />
                <div className="info">
                    <span>John</span>
                    <p>Posted 2 days ago</p>
                </div>
                <div className="edit">
                    <Link to={`/write?edit=${2}`}>
                    <img src={Edit} alt="" />
                    </Link>
                    <img src={Delete} alt="" />
                </div>
            </div>
            <h1>
                Lorem ipsum
            </h1>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae est velit nihil dolore quos veniam minus deleniti laboriosam perspiciatis totam fuga, adipisci at aliquam quae doloremque beatae ad quo aut.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae est velit nihil dolore quos veniam minus deleniti laboriosam perspiciatis totam fuga, adipisci at aliquam quae doloremque beatae ad quo aut.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae est velit nihil dolore quos veniam minus deleniti laboriosam perspiciatis totam fuga, adipisci at aliquam quae doloremque beatae ad quo aut.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae est velit nihil dolore quos veniam minus deleniti laboriosam perspiciatis totam fuga, adipisci at aliquam quae doloremque beatae ad quo aut.
            </p>
        </div>
        <Menu />
    </div>
  )
}

export default Single
