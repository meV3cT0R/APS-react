import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { logout } from "../../utility/login";

const NavbarTop = () => {
    const { user,setToken,setUser } = useGlobalContext();
    const navigate = useNavigate();
    return (
        <div className="bg-primary flex px-32 justify-between">
            {user!=null || <div className="flex-grow"></div>}
            {
                user && <><div className="flex space-x-5 text-lg py-1  capitalize "><div className="justify-self-end text-white ">
                     <span className="font-italic"> Logged in as </span> <Link to="profile"><span className="font-bold">{user.name}</span></Link>
                      </div> </div><button className="text-yellow-500 text-lg py-1"
                            onClick={()=> {
                                logout(setToken,setUser);
                                navigate("/login")
                            }}
                      > log out</button> </>||
                <Link
                    to="/login"
                    className="justify-self-end text-white text-lg py-1 cursor-pointer">
                    Log in
                </Link>
            }
        </div>)
}

export default NavbarTop;