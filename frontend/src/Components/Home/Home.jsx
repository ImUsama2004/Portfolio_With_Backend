import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MyPic from "../../assets/MyPic.jpg";

export const Home = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isHireOpen, setIsHireOpen] = useState(false);

  return (
    <div className="text-white flex flex-col md:flex-row w-full justify-between items-start p-10 md:p-20 gap-10">
      {/* Text Section */}
      <div className="md:w-1/2">
        <motion.h1
          className="text-2xl md:text-6xl font-bold leading-normal tracking-tighter text-[#38bdf8]"
          initial={{ x: -150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ amount: 0.3 }}
        >
          Muhammad Usama Saeed
        </motion.h1>

        <motion.p
          className="text-sm md:text-2xl tracking-tight mt-4 text-gray-300"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          viewport={{ amount: 0.3 }}
        >
          Hi, I'm Muhammad Usama Saeed, a passionate Frontend Developer with a strong
          focus on building modern, responsive, and user-friendly web
          applications using React.js. I specialize in creating clean and
          efficient UI components, integrating APIs, and optimizing performance
          for a seamless user experience. With a keen eye for design and a solid
          understanding of HTML, CSS, JavaScript, and Tailwind CSS, I aim to
          deliver intuitive interfaces that align with both user needs and
          business goals. I'm always eager to learn and explore the latest tools
          and trends in the frontend ecosystem to continuously improve my skills
          and build better products.
        </motion.p>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-4 mt-5 md:mt-10">
          {/* Contact Me */}
          <motion.a
            href="#Contact"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            viewport={{ amount: 0.3 }}
          >
            <motion.button
              className="text-white py-2 px-6 text-sm md:text-lg rounded-sm 
                         bg-[#38bdf8] hover:bg-[#0ea5e9] border-2 border-transparent 
                         shadow-[0_0_25px_#38bdf8,0_10px_25px_#38bdf8]"
              animate={{
                x: [0, 0, 12, 0, -12, 0],
                y: [0, -12, 0, 12, 0, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            >
              Contact Me
            </motion.button>
          </motion.a>

          {/* Resume */}
          <motion.button
            onClick={() => setIsResumeOpen(true)}
            className="text-white py-2 px-6 text-sm md:text-lg rounded-sm 
                       bg-green-500 hover:bg-green-600 border-2 border-transparent 
                       shadow-[0_0_25px_#34d399,0_10px_25px_#34d399]"
            animate={{
              x: [0, 0, 12, 0, -12, 0],
              y: [0, -12, 0, 12, 0, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
          >
            Resume
          </motion.button>

          {/* Hire Me */}
          <motion.button
            onClick={() => setIsHireOpen(true)}
            className="text-white py-2 px-6 text-sm md:text-lg rounded-sm 
                       bg-purple-500 hover:bg-purple-600 border-2 border-transparent 
                       shadow-[0_0_25px_#a78bfa,0_10px_25px_#a78bfa]"
            animate={{
              x: [0, 0, 12, 0, -12, 0],
              y: [0, -12, 0, 12, 0, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
          >
            Hire Me
          </motion.button>
        </div>
      </div>

      {/* Image Section */}
      <motion.div
        className="md:w-1/2 flex justify-center md:justify-end"
        animate={{
          x: [0, 12, 0, -12, 0],
          y: [0, -12, 0, 12, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      >
        <img
          className="w-full mt-40 max-w-md rounded-2xl shadow-[0_0_25px_#38bdf8] object-cover"
          src={MyPic}
          alt="Muhammad Usama"
        />
      </motion.div>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1e293b] rounded-2xl p-6 max-w-3xl w-full relative shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setIsResumeOpen(false)}
                className="absolute top-3 right-3 text-xl font-bold text-gray-300 hover:text-white"
              >
                &times;
              </button>
              <h2 className="text-2xl text-[#38bdf8] font-bold mb-4">My Resume</h2>

              <iframe
                src="http://localhost:5000/api/files/resume"
                width="100%"
                height="500px"
                frameBorder="0"
                title="Resume"
                className="rounded-lg"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hire Me Modal */}
      <AnimatePresence>
        {isHireOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1e293b] rounded-2xl p-6 max-w-md w-full relative shadow-xl flex flex-col gap-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setIsHireOpen(false)}
                className="absolute top-3 right-3 text-xl font-bold text-gray-300 hover:text-white"
              >
                &times;
              </button>
              <h2 className="text-2xl text-[#38bdf8] font-bold text-center">Hire Me</h2>
              <p className="text-gray-300 text-center">
                Interested in working together? Contact me via the Contact section or email <a href="mailto:em.usama2004@gmail.com"><span className="text-[#38bdf8]">em.usama@gmail.com</span></a>.
              </p>
              <a
                href="#Contact"
                className="bg-[#38bdf8] text-black px-4 py-2 rounded hover:bg-[#0ea5e9] self-center"
              >
                Go to Contact
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
