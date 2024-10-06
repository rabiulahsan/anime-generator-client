import { Link } from "react-router-dom";
import ActiveLink from "../../../Components/ActiveLink/ActiveLink";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log(`Search term: ${searchValue}`);
      setSearchValue("");
      //todo search logic apply
    }
  };

  return (
    // <div className="sticky top-0 left-0 z-50">
    <div className="flex justify-between items-center w-full absolute top-0 left-0 py-6 px-[4%]">
      {/* Left side with menu items */}
      <div className="flex items-center gap-x-10">
        <ActiveLink to="/gallary">
          <span className="font-semibold text-slate-700">Gallary</span>
        </ActiveLink>
        <ActiveLink to="/tools">
          <span className="font-semibold text-slate-700">Tools</span>
        </ActiveLink>
        <ActiveLink to="/pricing">
          <span className="font-semibold text-slate-700">Pricing</span>
        </ActiveLink>
      </div>

      {/* Centered logo */}
      <div className="absolute left-[48%] transform -translate-x-1/2">
        <Link to="/">
          <p className="text-3xl font-bold">
            <span className="text-sky-500">Ani</span>Gen
          </p>
        </Link>
      </div>

      {/* Right side with search and buttons */}
      <div className="flex gap-x-4 items-center">
        <div className="relative">
          <IoSearch className="absolute left-4 top-[55%] transform -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search your anime"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            className="pl-10 pr-3 py-[10px] w-full bg-slate-100 text-gray-700 rounded-full border-2 border-transparent focus:outline-none focus:border-slate-300 focus:bg-white transition-colors"
          />
        </div>

        <Link to="/login">
          <button className="font-semibold text-slate-700 px-5 py-3 rounded-full hover:bg-slate-100">
            Log in
          </button>
        </Link>
        <Link to="/signup">
          <button className="font-semibold text-white bg-sky-500 px-5 py-3 rounded-full hover:bg-sky-600">
            Sign up
          </button>
        </Link>
      </div>
    </div>

    // </div>
  );
};

export default Navbar;
