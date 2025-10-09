import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import { AuthContext } from '../context/authContext'
import axios from 'axios'
import moment from "moment"

const Single = () => {
    const { currentUser } = useContext(AuthContext)
    
    const [post, setPost] = useState(null)
    const navigate = useNavigate()

    const location = useLocation()
    const path = location.pathname.split('/')[2]
    console.log('postId:',post)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${path}`)
                console.log(res.data)
                setPost(res.data)
                
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [path])

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/posts/${path}`)

            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className="single">
        <div className="contents">
            <img src={`http://localhost:8800/images/${post?.img}`} alt="" />
            <div className="user">
                {post?.userImg && <img src={post?.userImg} alt="" />}
                <div className="info">
                    <span>{post?.username}</span>
                    <p>{post?.date && moment(post.date).fromNow()}</p>
                </div>
                {
                currentUser?.id === post?.uid &&
                <div className="edit">
                    <Link to={`/write?edit=${post.id}`}>
                    <img src={Edit} alt="" />
                    </Link>
                    <img onClick={handleDelete} src={Delete} alt="" />
                </div>
                }
            </div>
            <h1>
                {post?.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: post?.desc }}></div>

        </div>
        <Menu cat={post?.cat} />
    </div>
  )
}

export default Single
