import { useEffect, useState } from "react";
import React, { useContext } from "react";
import logo from "../assets/logo.png";

import { Link } from "react-scroll";

import { FaXmark, FaBars } from "react-icons/fa6";

import { ThemeContext } from "../ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  //theme
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
        setIsMenuOpen(false);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "home" },
    { link: "Service", path: "service" },
    { link: "About", path: "about" },
    { link: "Product", path: "product" },
    { link: "Testimonial", path: "testimonial" },
    { link: "FAQ", path: "faq" },
  ];
  return (
    <header className=" bg-white md:bg-transparent fixed top-0 left-0 right-0 dark:bg-darkbg2">
      <nav
        className={`py-4 lg:px-14 px-4 ${
          isSticky
            ? "sticky top-0 right-0 left-0 border bg-white dark:text-white dark:bg-darkbg2 transition-all duration-300 "
            : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <a
            href=""
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <img src={logo} alt="" className="w-10 inline-block items-center" />
            <span>NEXCENT</span>
          </a>

          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
                key={link}
                href={path}
                className="block text-base text-gray900 hover:text-brandPrimary first:font-medium dark:text-white"
              >
                {link}
              </Link>
            ))}
          </ul>

          <div className="space-x-12 hidden lg:flex items-center">
            <a
              href="/"
              className="hidden lg:flex items-center text-brandPrimary hover:text-gray900"
            >
              Login
            </a>
            <button className="bg-brandPrimary text-white  py-2 px-4 transition-all duration-300 rounded hover:bg-neutralDGrey">
              Sign up
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
              data-ripple-light="true"
            >
              {" "}
              {theme === "light"
                ? "Switch to Dark Mode"
                : "Switch to Light Mode"}
            </button>
          </div>

          {/* menu btn, visible on mobile screen */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray900 focus:outline-none focus:text-gray-500 dark:text-white"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 text-primary" />
              ) : (
                <FaBars className="h-6 w-6 text-primary" />
              )}
            </button>

            {/* //themebuttom */}
          </div>
        </div>

        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary dark:bg-brandPrimary  ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              to={path}
              spy={true}
              smooth={true}
              offset={-90}
              key={link}
              onClick={toggleMenu}
              className="block  text-white hover:text-gray-500 dark:text-white"
            >
              {link}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
          >
            {" "}
            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
