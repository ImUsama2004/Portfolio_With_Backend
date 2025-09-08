import React, { useRef, useState } from 'react';
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_lmsa5mh',
      'template_931yalq',
      form.current,
      'YqLUNUIx7OgyzXx-c'
    )
    .then(
      (result) => {
        setSuccessMessage('Message sent successfully!');
        e.target.reset();
      },
      (error) => {
        setSuccessMessage('Failed to send message. Try again later.');
      }
    );
  };

  const contacts = [
    { 
      icon: <FaEnvelope />, 
      text: 'em.usama2004@gmail.com', 
      link: 'mailto:em.usama2004@gmail.com',
      bgGradient: 'bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500'
    },
    { 
      icon: <FaLinkedin />, 
      text: 'LinkedIn', 
      link: 'https://www.linkedin.com/in/muhammad-usama-88a306267/',
      bgGradient: 'bg-gradient-to-r from-blue-700 to-blue-400'
    },
    { 
      icon: <FaGithub />, 
      text: 'GitHub', 
      link: 'https://github.com/ImUsama2004',
      bgGradient: 'bg-gradient-to-r from-gray-800 to-gray-600'
    },
    { 
      icon: <FaPhoneAlt />, 
      text: '+92 336 9610764', 
      link: 'tel:+923369610764',
      bgGradient: 'bg-gradient-to-r from-teal-600 to-teal-400'
    },
    { 
      icon: <FaWhatsapp />, 
      text: '+92 336 9610674', 
      link: 'https://wa.me/923369610674',
      bgGradient: 'bg-gradient-to-r from-green-600 to-green-400'
    },
  ];

  return (
    <div id='Contact' className='text-white p-10 md:p-12'>
      <div className="md:flex md:flex-row flex-col justify-around items-start gap-10">

        {/* Heading + Contact Links */}
        <motion.div
          className="flex flex-col items-center md:items-start gap-2 mb-6 md:mb-0 -mt-4"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <h1 className='text-2xl md:text-6xl font-bold text-[#38bdf8]'>Contact</h1>
          <h3 className='text-sm md:text-2xl font-normal text-[#38bdf8]'>Feel Free To Contact</h3>

          {/* Contact Links */}
          <div className="mt-2 flex flex-col gap-2 md:gap-3">
            {contacts.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm md:text-base text-white p-2 rounded shadow-[0_0_15px_#38bdf8] hover:shadow-[0_0_25px_#38bdf8]
                  ${contact.bgGradient}`}
                animate={{
                  x: [0, 3, 0, -3, 0],
                  y: [0, -3, 0, 3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
                whileHover={{ scale: 1.05 }}
              >
                {contact.icon} {contact.text}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col gap-4 w-full md:w-1/2"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="p-3 rounded bg-gray-800 border border-gray-600 shadow-[0_0_15px_#38bdf8] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="p-3 rounded bg-gray-800 border border-gray-600 shadow-[0_0_15px_#38bdf8] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="p-3 rounded bg-gray-800 border border-gray-600 shadow-[0_0_15px_#38bdf8] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="p-3 rounded bg-gray-800 border border-gray-600 shadow-[0_0_15px_#38bdf8] focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          />
          <button
            type="submit"
            className="bg-[#38bdf8] text-black font-semibold py-3 rounded shadow-[0_0_15px_#38bdf8] hover:shadow-[0_0_25px_#38bdf8] hover:bg-blue-400 transition"
          >
            Send Message
          </button>
          {successMessage && <p className="text-green-400 mt-2">{successMessage}</p>}
        </motion.form>

      </div>

      {/* Copyright Line */}
      <div className="mt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Muhammad Usama. All rights reserved.
      </div>
    </div>
  );
};
