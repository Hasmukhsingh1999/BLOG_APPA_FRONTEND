import LOGO from "../imgs/logo.png";
import { Link, Outlet } from "react-router-dom";
import { CiSearch, CiEdit } from "react-icons/ci";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { FaBell } from "react-icons/fa";
import UserNavigationPanel from "./user-navigation.component";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

  const [userNavPanel, setUserNavPanel] = useState(false);

  const {
    userAuth,
    userAuth: { access_token, profileImg },
  } = useContext(UserContext);

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  return (
    <>
      <nav className="relative flex items-center gap-10 p-3 px-[3vw]">
        <Link to={"/"}>
          <img src={LOGO} alt="" className="w-10 flex-none" />
        </Link>
        <div
          className={`absolute bg-white w-full left-0 top-full border-b border-gray-100 py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:bg-transparent md:w-auto  md:opacity-100 pointer-events-auto duration-100 ${
            searchBoxVisibility
              ? "opacity-100 pointer-events-auto duration-100"
              : "opacity-0 pointer-events-none duration-100"
          }`}
        >
          <input
            type="search"
            name=""
            id=""
            placeholder="Search"
            className="w-full md:w-auto bg-gray-100 p-3 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-gray-500 md:pl-12"
          />
          <CiSearch className="absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-gray-600" />
        </div>

        {/* CLICK ON THE SEARCH BUTTON SEARCH WILL APPEAR */}
        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden text-2xl w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center"
            onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
          >
            <CiSearch className="text-xl" />
          </button>
          {/* CLICK ON THE SEARCH BUTTON SEARCH WILL APPEAR */}
          <Link
            to={`/editor`}
            className={`hidden md:flex items-center gap-2 link`}
          >
            <CiEdit className="text-xl" />
            <p>Write</p>
          </Link>

          {access_token ? (
            <>
              <Link to={"/dashboard/notification"}>
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10 flex items-center justify-center">
                  <FaBell />
                </button>
              </Link>
              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={handleBlur}
              >
                <button className="w-12 h-12 mt-1">
                  <img
                    src={profileImg}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>

                {userNavPanel ? <UserNavigationPanel /> : ""}
              </div>
            </>
          ) : (
            <>
              <Link to={"/signin"} className="btn-dark py-2">
                Sign In
              </Link>
              <Link to={"/signup"} className="btn-light py-2 hidden md:block">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
