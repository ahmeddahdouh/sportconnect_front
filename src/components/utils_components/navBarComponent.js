import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import UserDropDown from "../profile components/userDropDown";
import Avatar from "@mui/material/Avatar";
import {useUser} from "../../context/UserContext";
import UserEntity from "../../entities/UserEntity";

export default function NavBar() {
    const mobileMenuRef = useRef(null);
    const { currentUser } = useUser() ;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const username = currentUser?.username;
    const email = currentUser?.email;

    const imageLink = currentUser instanceof UserEntity
        ? currentUser.getProfileImageUrl?.()
        : currentUser?.profileImage;

    function handleLogout() {
        localStorage.clear();
        window.location.href = "/login";
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target)
            ) {
                setMobileMenuOpen(false);
            }
        }

        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mobileMenuOpen]);


    const [showDropdown, setShowDropdown] = useState(false);
    function toggleDropdown() {
        setShowDropdown(prev => !prev);
    }

    return (
        <header
            className={`border-b border-gray-200 fixed top-0 w-full z-50
    ${!mobileMenuOpen ? 'bg-white/30' : 'bg-white'}`}
        >
            <nav className="w-full  mx-auto px-4 sm:px-6 lg:px-8 md:backdrop-blur-3xl lg:backdrop-blur-3xl ">

                <div className="w-full bg flex justify-between h-16">
                    {/* Logo and mobile menu button */}
                    <div className="flex items-center ">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 md:hidden hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>

                        {/* Logo */}
                        <Link to="/landingPage" className=" flex flex-row ">
                            <img src="/logo.png" className="h-10" alt=""/>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                        <Link to="/landingPage" className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
                            Accueil
                        </Link>
                        <Link to="/booking" className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
                            Événements
                        </Link>
                        <Link to="/" className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
                            Créer un événement
                        </Link>
                        <Link to="/myEvents" className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
                            Mes événements
                        </Link>
                    </div>

                    <div className="flex items-center">
                        {username ? (
                            <div className="ml-3 relative">
                                <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                                    {imageLink ? (
                                        <Avatar alt={username} src={imageLink} sx={{width: 32, height: 32}}/>
                                    ) : (
                                        <Avatar sx={{width: 32, height: 32, bgcolor: '#e5e7eb', color: '#4b5563'}}>
                                            {username.slice(0, 1).toUpperCase()}
                                        </Avatar>
                                    )}
                                </button>

                                {showDropdown && (
                                    <UserDropDown handleLogout={handleLogout}
                                                  setShowDropdown={setShowDropdown}
                                                  username={username}
                                                  email={email}
                                    />
                                )}
                            </div>

                        ) : (
                            <Link to="/login"
                                  className="ml-3 px-4 py-2 border border-blue-600 rounded-full text-sm font-medium text-blue-600 hover:bg-blue-50">
                                Connexion
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile menu, show/hide based on menu state */}
            {mobileMenuOpen && (
                <div className="md:hidden" ref={mobileMenuRef}>
                    <div className="pt-2 pb-3 space-y-1">
                        <Link to="/"
                              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                            Accueil
                        </Link>
                        <Link to="/booking"
                              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                            Événements
                        </Link>
                        <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                            Créer un événement
                        </Link>
                        <Link to="/myEvents"
                              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                            Mes événements
                        </Link>
                        {username && (
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            >
                                Se déconnecter
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}