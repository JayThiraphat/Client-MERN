import {BrowserRouter, Routes,Route} from "react-router-dom"
import App from "./App"
import FormComponent from "./components/FormComponent"
import SingleComponent from "./components/SingleComponent"
import EditComponent from "./components/EditComponent"
import LoginComponent from "./components/LoginComponent"
import AdminRoute from "./AdminRoute"
const MyRoute=()=>{
    return(

        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App/>}/>
                <Route path="/create" exact element={<FormComponent/>}/>
                <Route path="/blog/:slug" exact element={<SingleComponent/>}/>
                <Route path="/blog/edit/:slug" exact element={<EditComponent/>}/>
                <Route path="/login" exact element={<LoginComponent/>}/>
            </Routes>
        </BrowserRouter>
    
    )

}
export default MyRoute