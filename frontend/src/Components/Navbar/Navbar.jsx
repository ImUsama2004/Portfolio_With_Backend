import React, { useState, useEffect } from 'react';

export const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [animate, setAnimate] = useState(false);

  const toggleMenu = () => setMenu(!menu);

  useEffect(() => setAnimate(true), []);

  const title = "My Portfolio";

  const links = [
    { href: "#About", text: "About" },
    { href: "#Projects", text: "Projects" },
    { href: "#Experience", text: "Experience" },
    { href: "#Contact", text: "Contact" },
  ];

  return (
    <nav className="flex flex-wrap items-center justify-between text-white px-6 py-4 md:px-20 bg-[#0f172a] sticky top-0 z-50 shadow-[0_4px_20px_#38bdf8]">
      
      {/* Portfolio Title */}
      <span className="font-bold tracking-wider text-5xl md:text-4xl text-[#38bdf8] flex flex-wrap">
        {title.split("").map((letter, index) => (
          <span
            key={index}
            className={`inline-block transition-transform duration-700 ease-out
              ${animate ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            {letter}
          </span>
        ))}
      </span>

      {/* Hamburger / Close Icon for Mobile */}
      <div className="md:hidden cursor-pointer text-white text-3xl" onClick={toggleMenu}>
        {menu ? <i className="ri-close-line"></i> : <i className="ri-menu-2-line"></i>}
      </div>

      {/* Links */}
      <ul className={`w-full md:w-auto mt-4 md:mt-0 font-semibold text-center md:flex md:items-center gap-6
        ${menu ? 'block' : 'hidden'}`}>
        {links.map((link, index) => (
          <a key={index} href={link.href}>
            <li className="text-md text-[#38bdf8] transition-colors duration-300 hover:text-white py-2 md:py-0">
              {link.text}
            </li>
          </a>
        ))}
      </ul>
    </nav>
  );
};
