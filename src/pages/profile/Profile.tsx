import { NavLink, Outlet } from "react-router-dom";

const Profile = ()=> {
    return (
        <div className="grid grid-cols-12 max-w-[1320px] mx-auto py-10 gap-8">
            <div className="col-span-2">
                <ul className="">
                    <li className="capitalize text-center "> <NavLink to="" className={({isActive})=>`py-2 px-3 w-full block ${isActive && " bg-primary text-white"}`} end> user details </NavLink></li>
                    <li className="capitalize text-center">  <NavLink to="order_history" className={({isActive})=>`py-2 px-3 w-full block ${isActive && " bg-primary text-white"}`} end>order history</NavLink></li>
                    <li className="capitalize text-center ">  <NavLink to="change_password" className={({isActive})=>`py-2 px-3 w-full block ${isActive && " bg-primary text-white"}`} end>Change Password</NavLink></li>
                </ul>
            </div>
            <div className="col-span-8">
                <Outlet/>
            </div>
        </div>
    )
}

export default Profile;