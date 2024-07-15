import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Main(){

    return (<>
    <Navbar/>

    <Outlet />

    <Footer/>
    </>)
}

export default Main;