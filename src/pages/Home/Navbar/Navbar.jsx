import { Link, useNavigate } from "react-router-dom";
import ActiveLink from "../../../Components/ActiveLink/ActiveLink";
import { useEffect, useRef, useState } from "react";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5"; // added icons
import { GiTwoCoins } from "react-icons/gi";
import LoginModals from "../../../Shared/Modals/LoginModals";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import useCoin from "../../../Hooks/UseCoin/UseCoin";
import ProfileModals from "../../../Shared/Modals/ProfileModals";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { logOut, user } = UseAuth();
  const { coin } = useCoin();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // toggle for mobile menu
  const [isSearchOpen, setIsSearchOpen] = useState(false); // toggle for mobile search

  const navigate = useNavigate();

  const searchRef = useRef(null); // to handle click outside
  const searchInputRef = useRef(null);

  const handleLogOut = () => {
    logOut()
      .then(navigate("/"))
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      const encodedSearchValue = encodeURIComponent(searchValue.trim()).replace(
        /%20/g,
        "+"
      );
      navigate(`/results?search_query=${encodedSearchValue}`);
      setSearchValue("");
    }
  };

  // Close the search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Auto-focus the input field when the search bar is open
      searchInputRef.current.focus();
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  //for showing log in  modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  //for showing profile  modal
  const [showProfileModal, setShowProfileModal] = useState(false);
  const openProfileModal = () => {
    setShowProfileModal(true);
  };
  const closeProfileModal = () => setShowProfileModal(false);

  return (
    <div className="sticky top-0 left-0 z-50 ">
      <div className="flex justify-between items-center w-full py-4 px-[4%] relative bg-white bg-opacity-60 backdrop-blur-sm">
        {/* Left side with menu items and hamburger for mobile */}
        <div className="flex items-center gap-x-6">
          {!isSearchOpen && (
            <button
              className="text-3xl md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
          )}
          <div className="hidden md:flex gap-x-6">
            <span className="font-bold text-slate-800 hover:text-sky-500">
              <ActiveLink to="/gallery">Gallery</ActiveLink>
            </span>
            {user && (
              <span className="font-bold text-slate-800 hover:text-sky-500">
                <ActiveLink to="/creation">My Creation</ActiveLink>
              </span>
            )}
            <span className="font-bold text-slate-800 hover:text-sky-500">
              <ActiveLink to="/tools">Tools</ActiveLink>
            </span>
            <span className="font-bold text-slate-800 hover:text-sky-500">
              <ActiveLink to="/pricing">Pricing</ActiveLink>
            </span>
          </div>
        </div>

        {/* Centered logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex">
          <Link to="/">
            <p className="text-4xl font-bold font-playball text-slate-600">
              <span className="text-sky-500">Ani</span>Gen
            </p>
          </Link>
        </div>

        {/* Right side with search and buttons */}
        <div className="flex items-center gap-x-4">
          {/* Search bar */}
          <div className="relative md:w-auto w-full" ref={searchRef}>
            {!isSearchOpen && (
              <button
                className="text-2xl md:hidden"
                onClick={() => setIsSearchOpen(true)}
              >
                <IoSearch />
              </button>
            )}

            <div
              className={`relative ${
                isSearchOpen ? "block" : "hidden"
              } md:block`}
            >
              <IoSearch className="absolute left-4 top-[55%] transform -translate-y-1/2 text-slate-500" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search your anime..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
                className="pl-10 pr-3 py-[10px] text-slate-600 font-semibold w-full bg-slate-100 rounded-full border-2 border-transparent focus:outline-none focus:border-slate-300 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* login or logout button */}
          {user && !isSearchOpen ? (
            <button
              onClick={handleLogOut}
              className="hidden md:flex font-bold text-slate-100 bg-slate-600 px-4 py-2 rounded-full hover:bg-slate-700"
            >
              Log out
            </button>
          ) : (
            !isSearchOpen && (
              <button
                onClick={openModal}
                className="hidden md:flex  font-bold text-white bg-sky-500 px-4 py-2 rounded-full hover:bg-sky-600"
              >
                Log in
              </button>
            )
          )}

          {/* Profile and coins display */}
          {user && !isSearchOpen && (
            <>
              <p
                title="Coins you have"
                className="hidden md:flex items-center gap-x-1 bg-slate-200 py-2 px-4 rounded-full text-lg font-semibold text-slate-700"
              >
                <GiTwoCoins />
                {coin}
              </p>
              <img
                onClick={openProfileModal}
                className="h-10 w-10 object-cover rounded-full cursor-pointer"
                src={user.photoURL}
                alt={user.displayName}
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-white py-2`}
      >
        <Link
          to="/gallary"
          className="block py-2 text-center font-bold text-slate-800 hover:text-sky-500"
        >
          Gallery
        </Link>
        {user && (
          <Link
            to="/creation"
            className="block py-2 text-center font-bold text-slate-800 hover:text-sky-500"
          >
            My Creation
          </Link>
        )}
        <Link
          to="/tools"
          className="block py-2 text-center font-bold text-slate-800 hover:text-sky-500"
        >
          Tools
        </Link>
        <Link
          to="/pricing"
          className="block py-2 text-center font-bold text-slate-800 hover:text-sky-500"
        >
          Pricing
        </Link>
        <div className=" flex justify-center items-center mt-5">
          <button
            onClick={openModal}
            className="font-bold text-white bg-sky-500 px-5 py-3 rounded-md hover:bg-sky-600"
          >
            Log in
          </button>
        </div>
      </div>

      {/* Modals */}
      <LoginModals showModal={showModal} handleClose={closeModal} />
      <ProfileModals
        showProfileModal={showProfileModal}
        handleProfileClose={closeProfileModal}
      />
    </div>
  );
};

export default Navbar;
