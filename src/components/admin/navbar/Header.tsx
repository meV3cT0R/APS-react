import BrandLogo from '../../navbar/BrandLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../hooks/useGlobalContext';

const Header = ({ sidebarOpen, setSidebarOpen }: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const {setToken,setUser} = useGlobalContext();
  return (
    <header className="sticky top-0 z-[9999] flex w-full bg-white drop-shadow-1 shadow-xl ">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-[15px] 2xl:px-[25px]">
        <div className="flex items-center gap-2 sm:gap-4 ">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm text-secondary text-2xl bg-white p-2 border h-[50px] w-[50px]  "
          >
            <FontAwesomeIcon icon={faHamburger} />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}


          <BrandLogo className={"h-[60px]"}/>
          <div className="hidden sm:block lg:ml-[100px] md:ml-[110px] ml-[120px]">
            <form method="POST">
              <div className="relative">
                <button className="absolute left-0 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon icon={faSearch} />
                </button>

                <input
                  type="text"
                  placeholder="Type to search..."
                  className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none  xl:w-125"
                />
              </div>
            </form>
          </div>
        </div>



        <div className="flex items-center gap-3 2xsm:gap-7 space-x-5">
          <ul className="flex items-center gap-2 2xsm:gap-4 space-x-5">
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <div>
            <button 
            className='border-2 border-red-500 px-3 py-1 text-red-500 rounded-lg hover:bg-red-500 hover:text-white duration-300'
              onClick={()=> {
                  setUser(null);
                  setToken(null);
                  localStorage.removeItem("token");
                  navigate("/login")
              }}
            >
              logout
            </button>
          </div>
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;