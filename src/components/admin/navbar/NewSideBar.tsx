import { Dispatch, SetStateAction, forwardRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faAngleLeft, faCat, faPerson, faShop } from "@fortawesome/free-solid-svg-icons";
import BrandLogo from "../../navbar/BrandLogo";
import "../../products/products.css"
import NavLinkHelper from "./NavLinkHelper";

const NewSidebar = forwardRef<HTMLDivElement, { sidebarOpen: boolean, setSidebarOpen?: Dispatch<SetStateAction<boolean>> }>(({ sidebarOpen,setSidebarOpen }, ref) => {
    const adminLinks :{
        name: string;
        path: string;
        icon: IconDefinition
    }[] = [
        {
            name: "category",
            path: "/admin/category",
            icon: faCat
        },
            {
                name: "products",
                path: "/admin/products",
                icon: faShop
            },
            
            {
                name: "users",
                path: "/admin/users",
                icon: faPerson
            },            
        ]
    return (
        // <div className="z-[99999]" ref={ref}>
        //     <div className={`bg-white h-full duration-500 pt-[50px]`}>
        //         {<div className={`no-scrollbar flex flex-col overflow-y-auto ease-linear `}>
        //             {/* <!-- Sidebar Menu --> */}
        //             <nav className="mt-5 py-4  lg:mt-9 ">
        //                 <div>
        //                     <ul className="mb-6 flex flex-col gap-1.5">
        //                         {adminLinks.map((link, i) => {
        //                             return <NavLink
        //                                 key={JSON.stringify(link) + i}
        //                                 to={link.path}
        //                                 className={({ isActive }) => {
        //                                     const style = "px-11 py-3 w-full capitalize hover:text-primary duration-300";
        //                                     return isActive ? `${style} bg-slate-100 text-primary` : `${style} text-secondary`;
        //                                 }}
        //                             >
        //                                 <span><FontAwesomeIcon icon={link.icon} /></span>
        //                                 {sidebarOpen && <span> {link.name}</span>}
        //                             </NavLink>
        //                         })}
        //                     </ul>
        //                 </div>
        //             </nav>
        //             {/* <!-- Sidebar Menu --> */}
        //         </div>
        //         }


        //     </div>
        // </div>
        <div className={`h-full fixed left-0 border-2 shadow-xl bg-white overflow-x-visible overflow-y-scroll  invis_scroll duration-300 ${sidebarOpen?"z-[99999] w-[300px]":"z-[99] lg:w-[100px] w-[0px]"}`} ref={ref}>
            <div className="h-[80px] ">
                <div className={`flex justify-between md:pl-8 px-3  py-3 items-center ${sidebarOpen?"":"hidden"}`}>
                    <BrandLogo className=" text-center "/>
                    <button
                    onClick={()=>{if(setSidebarOpen)setSidebarOpen(!sidebarOpen)}}
                        className="px-5 text-4xl "
                    > 

                        <FontAwesomeIcon icon={faAngleLeft}/>
                    </button>
                </div>
            </div>
            <ul className="flex flex-col h-full bg-white mt-3.5 overflow-x-visible">
                {adminLinks.map((link, i) => {
                    return <NavLinkHelper link={link} i={i} sidebarOpen={sidebarOpen}/>
                })}
            </ul>
        </div>
    )
})
export default NewSidebar;