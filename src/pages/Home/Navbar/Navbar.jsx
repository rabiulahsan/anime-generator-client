import { Link, useNavigate } from "react-router-dom";
import ActiveLink from "../../../Components/ActiveLink/ActiveLink";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import LoginModals from "../../../Shared/Modals/LoginModals";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import useCoin from "../../../Hooks/UseCoin/UseCoin";
import ProfileModals from "../../../Shared/Modals/ProfileModals";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { logOut, user } = UseAuth();
  const { coin } = useCoin();
  // console.log(coin);

  const navigate = useNavigate();

  // functon for logout
  const handleLogOut = () => {
    logOut()
      .then(navigate("/"))
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log(`Search term: ${searchValue}`);
      setSearchValue("");
      //todo search logic apply
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
    <div className="sticky top-0 left-0 z-50">
      <div className="flex justify-between items-center w-full pt-6 pb-4 px-[4%] relative bg-white bg-opacity-60 backdrop-blur-sm">
        {/* Left side with menu items */}
        <div className="flex items-center gap-x-10">
          <span className="font-bold text-slate-800 hover:text-sky-500">
            <ActiveLink to="/gallary">Gallary</ActiveLink>
          </span>
          {/* optional option */}
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

        {/* Centered logo */}
        <div className="absolute left-[48%] transform -translate-x-1/2">
          <Link to="/">
            <p className="text-4xl font-bold font-playball text-slate-600">
              <span className="text-sky-500">Ani</span>Gen
            </p>
          </Link>
        </div>

        {/* Right side with search and buttons */}
        <div className="flex gap-x-4 items-center">
          {/* Search bar */}
          <div className="relative">
            <IoSearch className="absolute left-4 top-[55%] transform -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search your anime..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
              className="pl-10 pr-3 py-[10px] w-full bg-slate-100 text-gray-700 rounded-full border-2 border-transparent focus:outline-none focus:border-slate-300 focus:bg-white transition-colors"
            />
          </div>

          {/* login or logout button optional based on user  */}
          {user ? (
            <button
              onClick={handleLogOut}
              className="font-bold text-slate-100 bg-slate-600 px-5 py-3 rounded-full hover:bg-slate-700"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={openModal}
              className="font-bold text-white bg-sky-500 px-5 py-3 rounded-full hover:bg-sky-600"
            >
              Log in
            </button>
          )}
          {user && (
            <p
              title="Coins you have"
              className="flex items-center gap-x-1 bg-slate-200 py-2 px-4 rounded-full text-lg font-semibold text-slate-700"
            >
              <span className="text-xl">
                <GiTwoCoins></GiTwoCoins>
              </span>
              {coin}
            </p>
          )}

          {user && (
            <img
              onClick={openProfileModal}
              className="h-[40px] w-[40px] object-cover rounded-full cursor-pointer"
              src={user.photoURL}
              alt={user.displayName}
            />
          )}

          {/* <button
            onClick={() => openModal("login")}
            className="font-bold text-slate-700 px-5 py-3 rounded-full hover:bg-slate-100"
          >
            Log in
          </button> */}

          {/* <button className="font-bold text-white bg-sky-500 px-5 py-3 rounded-full hover:bg-sky-600">
            Sign up
          </button> */}
        </div>
      </div>
      {/* Modal */}
      <LoginModals showModal={showModal} handleClose={closeModal} />
      <ProfileModals
        showProfileModal={showProfileModal}
        handleProfileClose={closeProfileModal}
      ></ProfileModals>
    </div>
  );
};

export default Navbar;
