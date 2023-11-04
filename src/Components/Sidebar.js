import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import openMenu from "./SVG/bars-solid.svg";
import closeMenu from "./SVG/bars-staggered-solid.svg";
import dashboardIcon from "./SVG/dashboard-svgrepo-com.svg";
import accountsIcon from "./SVG/accounts.svg";
import payrollIcon from "./SVG/payroll.svg";
import reportsIcon from "./SVG/reports.svg";
import advisorIcon from "./SVG/advisor.svg";
import contactsIcon from "./SVG/contacts.svg";
// import assiduus from "./Images/assiduus.png";
import "./Sidebar.css";

const Sidebar = () => {
    const [responsiveMenu, setresponsiveMenu] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState(0);

    const toggleMobileMenu = () => {
        setresponsiveMenu(!responsiveMenu);
    };

    const hamburgerMenu = (menuItem) => {
        setActiveMenuItem(menuItem);
    };

    const menuItemData = [
        { icon: dashboardIcon, text: "Dashboard", path: "/dashboard" },
        { icon: accountsIcon, text: "Accounts", path: "/accounts" },
        { icon: payrollIcon, text: "Payroll", path: "/payroll" },
        { icon: reportsIcon, text: "Reports", path: "/reports" },
        { icon: advisorIcon, text: "Advisor", path: "/advisor" },
        { icon: contactsIcon, text: "Contacts", path: "/contacts" }
    ];


    return (
        <aside className="bg-white lg:w-[30%] xl:w-[18%] lg:h-[100vh]">
            <div className="container flex lg:flex-col justify-between lg:justify-normal md:px-8 lg:px-0 ">
                {/* <div className="flex items-center px-2 py-3 ">
                    <img src={assiduus} alt="assiduus" className="w-16"></img>
                    <span className="text-2xl md:text-3xl lg:text-2xl font-extrabold">ASSIDUUS <sup className='font-medium'>&trade;</sup></span>

                </div> */}

                <div className="hidden mt-3 lg:flex lg:flex-col ">
                    {menuItemData.map((menuItem, index) => (
                        <Router key={index}>
                            <Link
                                // to="/"
                                to={menuItem.path}
                                className={`flex  p-1.5 py-2  hover:bg-slate-200 hover:text-black ${activeMenuItem === index ? "bg-green-600 text-slate-200" : ""
                                    }`}
                                onClick={() => hamburgerMenu(index)}
                            >
                                <p className="flex gap-5 mx-8 text-lg font-medium">
                                    <img
                                        src={menuItem.icon}
                                        alt={`${menuItem.text} Icon`}
                                        className="w-5 "
                                    />
                                    {menuItem.text}
                                </p>
                            </Link>
                        </Router>
                    ))}
                </div>

                <button className="lg:hidden px-5" onClick={toggleMobileMenu}>
                    <img src={responsiveMenu ? closeMenu : openMenu} alt="menuIcon" />
                </button>
            </div>

            <div
                className={`flex flex-col gap-4 mt-3 ${responsiveMenu ? 'block' : 'hidden'} bg- shadow-lg lg:hidden md:px-10 pb-5`}
            >
                {menuItemData.map((menuItem, index) => (
                    <Router key={index}>
                        <Link
                            // to="/"
                            to={menuItem.path}
                            className={`flex  p-1.5 py-2  hover: ${activeMenuItem === index ? "bg-green-600 text-slate-200" : ""
                                }`}
                            onClick={() => hamburgerMenu(index)}
                        >
                            <p className="flex gap-5 mx-8 text-lg font-medium">
                                <img src={menuItem.icon} alt={`${menuItem.text} Icon`} className='w-5' />
                                {menuItem.text}
                            </p>
                        </Link>
                    </Router>
                ))}


            </div>
        </aside>
    );
};

export default Sidebar;
