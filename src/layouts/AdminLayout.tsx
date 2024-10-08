import {  useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';


import { useGlobalContext } from '../hooks/useGlobalContext';
import NewSidebar from '../components/admin/navbar/NewSideBar';
import Header from '../components/admin/navbar/Header';
import { loginWithToken } from '../utility/login';


const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const bodRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);

  const { user, setUser, token } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const func = async ()=> {
      if (!user){
        if(!token) navigate("/login");
        else  await loginWithToken(token,setUser).catch(_=>{console.log("hello");navigate("/login")});
      }
    }
    func();
  }, [token,setUser,navigate,user])

  if (!token || !user) {
    return "Loading..."
  }
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark ">

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <NewSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} ref={sideRef} />
        {/* <!-- ===== Sidebar End ===== --> */}
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
          {/* <!-- ===== Header End ===== --> */}
          {/* <!-- ===== Main Content Start ===== --> */}
          <main ref={bodRef} className='relative'>
            <div className={`p-2 md:p-4 2xl:p-10 ml-auto duration-300 z-[2] ${sidebarOpen ? " lg:w-[calc(100%-300px)] " : "lg:w-[calc(100%-100px)]"} box-border`}>
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default AdminLayout;