import LOGO from "../imgs/logo.png";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <nav className="relative flex items-center gap-10 p-2 px-[3vw]">
      <Link to={"/"}>
        <img src={LOGO} alt="" className="w-10 flex-none" />
      </Link>
      <div className="absolute bg-white w-full left-0 top-full border-b border-gray-100 py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:bg-transparent md:w-auto ">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search"
          className="w-full md:w-auto bg-gray-100 p-3 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-gray-500 md:pl-12"
        />
        <CiSearch className="absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-gray-600" />
      </div>
      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button>
          <CiSearch className="absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-gray-600" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
