import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavLinkHelper = ({link,i,sidebarOpen} : {link:any,i:number,sidebarOpen:boolean}) => {
    const [visible, setVisible] = useState<boolean>(false);
    return <NavLink
        key={JSON.stringify(link) + i}
        to={link.path}
        className={({ isActive }) => {
            const style = "relative navlink px-5  md:px-8 py-5 w-full overflow-x-visible capitalize hover:text-primary duration-300 flex items-center space-x-5 whitespace-nowrap";
            return isActive ? `${style} bg-slate-100 text-primary` : `${style} text-secondary`;
        }}

        onMouseEnter={() => {
            setVisible(true);
        }}
        onMouseLeave={() => {
            setVisible(false);

        }}
    >
        <span><FontAwesomeIcon icon={link.icon} className="text-2xl text-center" /></span>
        {sidebarOpen && <span> {link.name}</span>}
        {!sidebarOpen && <div
            className={`fixed text-xs left-20  arrow_box duration-300  text-white px-5 py-1 ${visible ? " translate-x-0 opacity-100 " : "translate-x-full opacity-0 pointer-events-none"}`}
        > {link.name} </div>}
    </NavLink>
}

export default NavLinkHelper