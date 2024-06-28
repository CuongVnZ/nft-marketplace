import { useState } from "react";
import { Link } from "react-router-dom";

// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from "../../redux/userRedux";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // const user = useSelector(state => state.user)

  // const dispatch = useDispatch();

  // const logoutHandler = () => {
  //     dispatch(logout())
  // }

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <div className="flex flex-start text-3xl text-white">
          <Link to="/home">
            <img
              src="/images/bytexlogo.png"
              alt="logo"
              className="h-14 w-14 md:h-20 md:w-20"
            />
          </Link>
          <Link to="/home">
            <h1 className="ml-3 md:text-2xl text-lg mt-2 font-bold">
              <strong>ByteX</strong>
            </h1>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden cursor-pointer" onClick={toggleDropdown}>
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } md:flex md:space-x-4 text-2xl mt-2 md:mt-0`}
        >

          {/* Home Link */}
          <Link
            to="/home"
            className="text-white md:text-2xl text-base hover:text-indigo-600 p-2"
          >
            <strong>Home</strong>
          </Link>
          {/* NFTs Link */}
          <Link
            to="/marketplace"
            className="text-white md:text-2xl text-base hover:text-indigo-600 p-2"
          >
            <strong>Marketplace</strong>
          </Link>
          <w3m-button />

          {/* { !user.currentUser &&
          <>
            <Link
              to="/signup"
              className="text-white md:text-2xl text-base hover:text-indigo-600 p-2"
            >
              <strong>Sign Up</strong>
            </Link>
          
            <Link
              to="/signin"
              className="text-white md:text-2xl text-lg hover:text-indigo-600 p-2"
            >
              <strong>Log In</strong>
            </Link>
          </>
          }

          { user.currentUser &&
          <>
            <w3m-button />
            <div className="relative" onClick={toggleDropdown}>
              <img
                src="https://placehold.co/200x200"
                alt="avatar"
                className="h-10 w-10 rounded-full cursor-pointer"
              />
              <div
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } absolute right-0 mt-2 bg-gray-800 rounded-md shadow-lg`}
              >
                <Link to="/profile" className="block px-4 py-2 text-white hover:bg-indigo-600">
                  <strong>Profile</strong>
                </Link>
                <Link to="/mint" className="block px-4 py-2 text-white hover:bg-indigo-600">
                  <strong>Mint</strong>
                </Link>
                <Link to="/transfer" className="block px-4 py-2 text-white hover:bg-indigo-600">
                  <strong>Transfer</strong>
                </Link>
                <Link to="/history" className="block px-4 py-2 text-white hover:bg-indigo-600">
                  <strong>History</strong>
                </Link>
                <Link
                  to="./"
                  onClick={logoutHandler}
                  className="block px-4 py-2 text-white hover:bg-indigo-600"
                >
                  <strong>Log Out</strong>
                </Link>
              </div>
            </div>
          </>
          } */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
