import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet, Navigate } from "react-router-dom";
// import { usenavigate } from "react-router"

// Main layout -> "/" Navbar + Home + Footer
// Dashboard -> "/dashboard" Navbar + Dashboard + Footer

const Mainlayout = () => {  
    
    // const navigate = usenavigate();
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    console.log(isLogin)

if(isLogin){
  return (
    <div>
      <Navbar/>
       <Outlet/>   {/* This will render the child route component */}
      <Footer/>
    </div>
  )
}
else{
    return <Navigate to="/auth" replace/>
}
}

export default Mainlayout