import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill-new';
import "react-quill-new/dist/quill.snow.css"; // add default styling
import { AuthContext } from '../context/authContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {

    const state = useLocation().state
    const [value, setValue] = useState('')
    const [title, setTitle] = useState( '')
    const [img, setImg] = useState(null)
    const [cat, setCat] = useState( '')
    
    const query = new URLSearchParams(useLocation().search);
    const isEditMode = query.has("edit");
    const postId = query.get("edit"); 
    console.log('postID:',postId)
    const navigate = useNavigate()

useEffect(() => {
  const fetchData = async () => {
    if (!isEditMode) return;

    try {
      const res = await axios.get(`/posts/${postId}`);
      console.log('response', res.data);

      setTitle(res.data.title || '');
      setValue(res.data.desc || '');
      setCat(res.data.cat || '');
      // If you want to handle the image:
      setImg(res.data.img || null);
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, [isEditMode, postId]);

    const publish = async () => {
        const newPost = {
                title,
                desc: value,
                cat
            }
        if(img) {
            const data = new FormData()
            const filename = Date.now() + img.name;
            data.append("name", filename)
            data.append("file", img)
            newPost.img = filename
            try {
                    await axios.post('/upload', data)
                    
            } catch(err) {
                console.log(err)
            }
        }

        try {
            if (isEditMode) {
                console.log(postId)
                const res = await axios.put(`/posts/${postId}`, newPost, {withCredentials: true})
                navigate('/')

            } else {
                const res = await axios.post('/posts', newPost, {withCredentials: true})
                navigate('/')
            }
            
        } catch (err) {
            console.log(err)
        }
    }
    
  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="editorContainer">
            <ReactQuill className='editor' value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
            {isEditMode ?<h1> Update </h1>:<h1> Publish </h1>}
            <span>
                <b>Status:</b> Draft
            </span>
            <span>
                <b>Visibility:</b> Public
            </span>
            <input style={{ display: 'none' }} type="file" id="file" name="" onChange={(e => setImg(e.target.files[0]))} />
            <label htmlFor="file" className='pressable'>Upload Image</label>
            <div className="buttons">
                <button>Save as a draft</button>
                <button onClick={publish}>{isEditMode ? 'Update' : 'Publish'}</button>
            </div>
        </div>
        <div className="item">
                <h1>Category</h1>
                <div className='categories'>
                <div className='category'>
                    <input type="radio" checked={cat === 'art'} name='cat' value='art' id='art' onChange={e => setCat(e.target.value)} />
                    <label htmlFor="art">Art</label>
                </div>
                <div className='category'>
                    <input type="radio" checked={cat === 'science'} name='cat' value='science' id='science' onChange={e => setCat(e.target.value)} />
                    <label htmlFor="science">Science</label>
                </div>
                <div className='category'>
                    <input type="radio" checked={cat === 'technology'} name='cat' value='technology' id='technology' onChange={e => setCat(e.target.value)} />
                    <label htmlFor="technology">Technology</label>
                </div>
                <div className='category'>
                    <input type="radio" checked={cat === 'cinema'} name='cat' value='cinema' id='cinema' onChange={e => setCat(e.target.value)} />
                    <label htmlFor="cinema">Cinema</label>
                </div>
                <div className='category'>
                    <input type="radio" checked={cat === 'design'} name='cat' value='design' id='design' onChange={e => setCat(e.target.value)} />
                    <label htmlFor="design">Design</label>
                </div>
                <div className='category'>
                    <input type="radio" checked={cat === 'food'} name='cat' value='food' id='food' onChange={e => setCat(e.target.value)} />
                    <label htmlFor="food">Food</label>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Write



