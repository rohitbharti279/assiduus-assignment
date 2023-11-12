import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import assiduus from "./Images/assiduus.png";
import search from "./SVG/magnifying-glass-solid.svg";
import alert from "./Images/alert.png";
import evano from "./Images/evano.webp";
import sara from "./Images/sara.jpg";
import sam from "./Images/sam.jpg";
import downArrow from "./SVG/caret-down-solid.svg";
import upArrow from "./SVG/caret-up-solid.svg";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(0);

    const users = [
        {
            name: 'Sara',
            role: 'Web developers',
            image: sara,
        },
        {
            name: 'Evano',
            role: 'Project Manager',
            image: evano,
        },
        {
            name: 'Sam',
            role: 'Data Scientist',
            image: sam,
        }
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleUserClick = (index) => {
        setSelectedUser(index);
        setIsOpen(false);
    };

    return (
        <header className="bg-white flex flex-wrap justify-center md:justify-between items-center px-5 sticky top-0">
            <div className="flex items-center px-2">
                <img src={assiduus} alt="assiduus" className="w-16"></img>
                <span className="text-2xl md:text-3xl lg:text-2xl font-extrabold">ASSIDUUS <sup className='font-medium'>&trade;</sup></span>

            </div>
            <div className="flex flex-wrap items-center justify-center gap-5">
                <form className="relative text-gray-600 focus-within:text-gray-400 ">
                    <span className="absolute p-1">
                        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <img src={search} alt="search-icon"></img>
                        </button>
                    </span>
                    <input type="search" placeholder="search" className="py-1.5 text-sm rounded-md pl-10 focus:outline-none bg-slate-200"></input>
                </form>

                <img src={alert} alt="alert-icon" className="w-6 h-6 my-auto cursor-pointer"></img>

                <Router>
                    <Link className="dropdown p-1.5 px-2 rounded-md">
                        <div className="selected-user flex gap-5 justify-between items-center" onClick={toggleDropdown}>
                            <img
                                src={users[selectedUser].image}
                                alt={users[selectedUser].name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="dropdown-arrow">{isOpen ? <img src={upArrow} alt='up-arrow'></img> : <img src={downArrow} alt='down-arrow'></img>}</div>
                        </div>
                        {isOpen && (
                            <div className="absolute dropdown-content flex flex-col gap-2 mt-2 cursor-pointer bg-[#272761] p-2 rounded -ml-16 md:-ml-28">
                                {users.map((user, index) => (
                                    <div
                                        key={index}
                                        className="user-card"
                                        onClick={() => handleUserClick(index)}
                                    >
                                        <div className="flex gap-2 items-center">
                                            <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                                            <p className="flex flex-col">
                                                <span className="text-white font-medium">{user.name}</span>
                                                <span className="text-gray-400 -mt-1">{user.role}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Link>
                </Router>
            </div>
        </header>
    );
};

export default Header;