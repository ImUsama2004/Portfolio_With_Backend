import React from "react";
import { IoArrowForward } from "react-icons/io5";
import Developer from "../../assets/Developer.png";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <div
      id="About"
className="text-white md:flex items-center md:flex-wrap md:justify-center bg-[#1e293b]/80 shadow-[0_0_20px_#38bdf8] mx-0 md:mx-20 bg-opacity-10 rounded-lg p-12"
    >
      <div className="md:flex flex-wrap md:flex-row items-start gap-20">

        {/* Heading and Image (slide from left) */}
        <motion.div
          className="flex flex-col items-start gap-5"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-[#38bdf8] mb-6">
            About
          </h2>
          <img src={Developer} alt="Developer" className="h-64" />
        </motion.div>

        {/* Paragraph Section (slide from right) */}
        <motion.ul
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div className="flex gap-3 py-4">
            <IoArrowForward size={30} className="mt-1 text-[#38bdf8]" />
            <span className="w-96">
              <h1 className="font-semibold text-lg text-[#f1f5f9]">
                Front End Developer
              </h1>
              <p className="text-gray-300">
                I'm a Frontend Developer with expertise in React.js,
                JavaScript, and Tailwind CSS. I build clean, responsive, and
                user-friendly web interfaces. Passionate about creating smooth
                and modern user experiences.
              </p>
            </span>
          </div>

          <div className="flex gap-3 py-4">
            <IoArrowForward size={30} className="mt-1 text-[#38bdf8]" />
            <span className="w-96">
              <h1 className="font-semibold text-lg text-[#f1f5f9]">
                Back End Developer
              </h1>
              <p className="text-gray-300">
                I'm currently learning backend development with Node.js and
                MongoDB. My goal is to become a full MERN stack developer by
                mastering both frontend and backend. I'm focused on building
                complete, scalable web applications using modern technologies.
              </p>
            </span>
          </div>
        </motion.ul>

      </div>
    </div>
  );
};
