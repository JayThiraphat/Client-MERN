import {  useState } from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getToken, getUser } from "../services/authorize"

const FormComponent = ()=>{
    const [state,setState] = useState({
        title:"",
        author:getUser()
    })
    const {title,author} = state

    const [content,setContent] = useState('')

    //กำหนดค่าให้กับ state
    const inputValue =value=>event=>{
        // console.log(value,"=",event.target.value)
        setState({...state,[value]:event.target.value})
    }
    const submitContent=(event)=>{
        setContent(event)
    }
    const submitForm =(e)=>{
        e.preventDefault()
        // console.table({title,content,author})
        console.log("API URL",import.meta.env.VITE_API)
        //create React ${process.env.REACT_APP_API}/create
        axios.post(`${import.meta.env.VITE_API}/create`,
        {title,content,author},
        {
            headers:{
                authorization:`Bearer ${getToken()}` 
            }
        })
        .then(response=>{
            Swal.fire(
                'แจ้งเตือน',
                'บันทึกข้อมูลบทความเรียบร้อย',
                'success'
              )
              setState({...state,title:"",author})
              setContent("")
            // alert("บันทึกข้อมูลเรียบร้อย")
        })
        .catch(err=>{
            // alert(err.response.data.error)
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
              )
        })
    }
    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>เขียนบทความ</h1>
            {/* {JSON.stringify(state)} */}
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
                <input type="submit" value="บันทึก" className="btn btn-primary"/>
            </form>
        </div>
    )
}
export default FormComponent