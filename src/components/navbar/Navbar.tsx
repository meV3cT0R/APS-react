import BrandLogo from "./BrandLogo";
import { ShoppingCart } from "@mui/icons-material";
import SearchBox from "../../utility/react/SearchBox";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    const links = [
        {
            name: "Home",
            path: "/",
        },
         {
            name: "about us",
            path: "/about-us"
        },
        {
            name: "products",
            path: "/products",
        }
    ]
    return (
        <div className=" flex py-5 items-center px-32 shadow space-x-10">
            <BrandLogo />
            <ul>
                {
                    links.map(link => {
                        return <li className="inline-block ">
                            <NavLink
                                to={link.path}
                                className={({isActive})=>`text-lg py-2 px-4 hover:text-primary cursor-pointer duration-300 ${isActive?"text-primary":""}`}
                            >

                            {link.name}
                            </NavLink>

                        </li>
                    })
                }
            </ul>
            <div className="flex flex-1">

            </div>
            <div className="flex space-x-5 ">
                <div>
                    <SearchBox/>
                </div>

                <button className="text-3xl hover:text-primary duration-300"> <ShoppingCart/> </button>
            </div>
        </div>
    )
}

export default Navbar;