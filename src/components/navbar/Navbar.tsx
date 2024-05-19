import BrandLogo from "./BrandLogo";
import { ShoppingCart } from "@mui/icons-material";
import SearchBox from "../../utility/react/SearchBox";

const Navbar = () => {

    const links = [
        {
            name: "Home",
            path: "/",
        }, {
            name: "Automobile spare parts",
            path: "/autoparts"
        }, {
            name: "products",
            path: "/products",
        }, {
            name: "about us",
            path: "/about-us"
        }
    ]
    return (
        <div className=" flex py-5 items-center px-32 shadow">
            <BrandLogo />
            <ul>
                {
                    links.map(link => {
                        return <li className="inline-block text-lg py-2 px-4 hover:text-primary cursor-pointer duration-300">

                            {link.name}

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