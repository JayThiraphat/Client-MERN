import { useState,useEffect } from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import {getToken} from  "../services/authorize"
import { useParams } from "react-router-dom"


const EditComponent =(props)=>{
    const [state,setState] = useState({
        title:"",
        author:"",
        slugvalue:""
    })
    const {title,author,slugvalue} = state
    const [content,setContent] = useState('')
    const submitContent=(event)=>{
        setContent(event)
    }
    const {slug} = useParams();
    const showUpdateForm=()=>(
        <form onSubmit={submitForm}> 
        <div className="form-group">
            <label>ชื่อบทความ</label>
            <input type="text" className="form-control" 
            value={title}
            onChange={inputValue("title")}/>
        </div>
        <div className="form-group">
            <label>รายละเอียด</label>
            <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="เขียนรายละเอียดบทความของคุณ"
                        style={{border:'1px solid #666'}}
            ></ReactQuill>
        </div>
        <div className="form-group">
            <label>ผู้แต่ง</label>
            <input type="text" className="form-control" 
            value={author}
            onChange={inputValue("author")} />
        </div>
        <br/>
        <input type="submit" value="อัพเดต" className="btn btn-primary"/>
    </form>
    )

    //กำหนดค่าให้กับ state
    const inputValue =value=>event=>{
        // console.log(value,"=",event.target.value)
        setState({...state,[value]:event.target.value})
    }
    const submitForm =(e)=>{
        e.preventDefault()
        axios.put(`${import.meta.env.VITE_API}/blog/${slug}`,{title,content,author},
        {
            headers:{
                authorization:`Bearer ${getToken()}` 
            }
        }
        )
        .then(response=>{
            Swal.fire(
                'แจ้งเตือน',
                'อัพเดตข้อมูลบทความเรียบร้อย',
                'success'
              )
            const {title,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>{
            alert(err)
        })
    }
    const [blog,setBlog] = useState('')
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API}/blog/${slug}`)
        .then(response=>{
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>alert(err))
    },[])
    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>แก้ไขบทความ</h1>
            {/* {JSON.stringify(state)} */}
             {showUpdateForm()}
        </div>
    )
}
export default EditComponent