import { Link } from "react-router-dom";

const NavbarTop = () => {

    return (
        <div className="bg-primary flex px-32">
            <div className="flex-grow"></div>
            <Link
                to="/login"
                className="justify-self-end text-white text-lg py-1 cursor-pointer">
                Log in
            </Link>
        </div>)
}

export default NavbarTop;