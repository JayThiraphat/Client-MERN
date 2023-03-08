import { Routes,Route,Navigate} from "react-router-dom"
import { getUser } from "./services/authorize"


const AdminRoute = ({component:Component,...rest})=>(
        <Route
        {...rest}
        render={props=>{
            getUser() ? (<Component {...props}/>) : (
            <Navigate  to={{pathname:"/login"
            }}/>)
        }} />
 )
export default AdminRoute