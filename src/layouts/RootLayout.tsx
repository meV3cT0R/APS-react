import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import NavbarTop from "../components/navbar/NavbarTop";

const RootLayout = ()=> {
    return (
        <div className="flex flex-col min-h-screen">
            <NavbarTop/>
            <Navbar/>
            <div className="flex-grow">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

export default RootLayout;