import axios from "axios"
import { useEffect, useState  } from "react"
import NavbarComponent from "./NavbarComponent"
import { Parser } from 'html-to-react'
import { useParams } from "react-router-dom"

const SingleComponent =(props)=>{
    const {slug} = useParams();
    const [blog,setBlog] = useState('')
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API}/blog/${slug}`)
        .then(response=>{
            setBlog(response.data)
        })
        .catch(err=>alert(err))
    },[])
    return (
        <div className="container p-5">
           <NavbarComponent/>
           {blog && 
           <div>
                <h1>{blog.title}</h1>
                <div>{Parser().parse(blog.content)}</div>
                <p className='text-muted'>ผู้เขียน: {blog.author} , วันที่: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>}
           
        </div>
    )
}
export default SingleComponent