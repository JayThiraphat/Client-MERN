import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './App.css'
import NavbarComponent from './components/NavbarComponent'
import Swal from 'sweetalert2'
import { Parser } from 'html-to-react'
import { getUser,getToken } from './services/authorize' 

function App() {
  const [blogs,setBlogs] = useState([])

  const fetchData=()=>{
    axios.get(`${import.meta.env.VITE_API}/blogs`)
    .then(response=>{
      setBlogs(response.data)
    })
    .catch(err=>alert(err))
  }
  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete=(slug)=>{
    Swal.fire({
      title:"คุณต้องการลบบทความหรือไม่ ?",
      icon:"warning",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog=(slug)=>{
    //ส่ง request api เพื่อลบข้อมูล
    axios.delete(`${import.meta.env.VITE_API}/blog/${slug}`,
    {
      headers:{
          authorization:`Bearer ${getToken()}` 
      }
    }
  )
    .then(response=>{
      Swal.fire(
          "Deleted",
          "ลบบทความเรียบร้อย",
          "success"
        )
        //ดึงข้อมูลล่าสุดมา
        fetchData()
    })
    .catch(err=>alert(err))
    
  }


  return (
    <div className='container p-5'>
      <NavbarComponent/>
      {/* {JSON.stringify(blogs)} */}
      {blogs.map((blog,index)=>(
        <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
          <div className='col pt-3 pb-2'>
            {/* <Link to={`/blog/${blog.slug}`}> */}
            <NavLink to={`/blog/${blog.slug}`}>
            {/* <a href={`/blog/${blog.slug}`} src=""> */}
              <h2>{blog.title}</h2>
            {/* </a> */}
            </NavLink>
            
            <div className='pt-3'>{Parser().parse(blog.content.substring(0,250))}</div>
            <p className='text-muted'>ผู้เขียน: {blog.author} , วันที่: {new Date(blog.createdAt).toLocaleDateString()}</p>
            {getUser() && (
              <div>
                <a className='btn btn-outline-success' href={`/blog/edit/${blog.slug}` } src=''
                >แก้ไขบทความ</a> &nbsp;
                <button className='btn btn-outline-danger'
                onClick={()=>confirmDelete(blog.slug)} >ลบบทความ</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
