import NavbarComponent from "./NavbarComponent"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { authenticate, getUser } from "../services/authorize"
import { useNavigate } from "react-router-dom"

const LoginComponent =(props)=>{

    const navigate = useNavigate()
    const [state,setState] = useState({
        username:"",
        password:""
    })
    const {username,password} = state
    const inputValue =value=>event=>{
        // console.log(value,"=",event.target.value)
        setState({...state,[value]:event.target.value})
    }
    const submitForm =(e)=>{
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API}/login`,{username,password})
        .then(response=>{
            //login สำเร็จ
            authenticate(response,()=>navigate("/create"))
            // console.log(response)
        })
        .catch(err=>{
            // console.log(err.response.data.error)
            Swal.fire(
                'แจ้งเตือน',
                 err.response.data.error,
                'error'
              )
        })
    }
    useEffect(()=>{
        getUser() && navigate("/")
    },[])
    return(
        <div className="container p-5">
        <NavbarComponent/>
        <h1>เข้าสู่ระบบ | Admin</h1>
        {/* {JSON.stringify(state)} */}
        <form onSubmit={submitForm}> 
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" 
                value={username} 
                onChange={inputValue("username")}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" 
                value={password}
                onChange={inputValue("password")} />
            </div>
            <br/>
            <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary"/>
        </form>
    </div>
    )
}
export default LoginComponent