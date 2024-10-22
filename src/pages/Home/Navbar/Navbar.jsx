import { Link, useNavigate } from "react-router-dom";
import ActiveLink from "../../../Components/ActiveLink/ActiveLink";
import { useState } from "react";
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
    <div className="sticky top-0 left-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center w-full py-4 px-[4%] relative bg-white bg-opacity-60 backdrop-blur-sm">
        {/* Left side with menu items and hamburger for mobile */}
        <div className="flex items-center gap-x-6">
          {/* Hamburger menu for mobile */}
          <button
            className="text-3xl md:hidden" // only show on mobile
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoClose /> : <IoMenu />}
          </button>

          <div className="hidden md:flex gap-x-6">
            <span className="font-bold text-slate-800 hover:text-sky-500">
              <ActiveLink to="/gallary">Gallery</ActiveLink>
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
        <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex md:flex-none">
          <Link to="/">
            <p className="text-3xl font-bold font-playball text-slate-600">
              <span className="text-sky-500">Ani</span>Gen
            </p>
          </Link>
        </div>

        {/* Right side with search and buttons */}
        <div className="flex gap-x-4 items-center">
          {/* Search bar */}
          <div className="relative">
            <button
              className="text-2xl md:hidden" // mobile search button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <IoSearch />
            </button>
            <div
              className={`relative ${
                isSearchOpen ? "block" : "hidden"
              } md:block`}
            >
              <IoSearch className="absolute left-4 top-[55%] transform -translate-y-1/2 text-slate-500" />
              <input
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
          {user ? (
            <button
              onClick={handleLogOut}
              className="hidden md:flex font-bold text-slate-100 bg-slate-600 px-4 py-2 rounded-full hover:bg-slate-700"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={openModal}
              className="hidden md:flex  font-bold text-white bg-sky-500 px-4 py-2 rounded-full hover:bg-sky-600"
            >
              Log in
            </button>
          )}
          {user && (
            <p
              title="Coins you have"
              className="hidden md:flex items-center gap-x-1 bg-slate-200 py-2 px-4 rounded-full text-lg font-semibold text-slate-700"
            >
              <GiTwoCoins />
              {coin}
            </p>
          )}

          {user && (
            <img
              onClick={openProfileModal}
              className="h-10 w-10 object-cover rounded-full cursor-pointer"
              src={user.photoURL}
              alt={user.displayName}
            />
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
