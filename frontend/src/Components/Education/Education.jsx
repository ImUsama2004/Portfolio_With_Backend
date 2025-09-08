import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EducationCard } from "./EducationCard";
import axios from "axios";

export const Education = () => {
  const [educations, setEducations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ institute: "", degree: "", year: "", cgpa: "", percentage: "" });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showCodePrompt, setShowCodePrompt] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const secretCode = "MYSECRET123";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch education from backend
 useEffect(() => {
  axios.get("http://localhost:5000/api/educations")
    .then(res => {
      console.log("Fetched educations:", res.data); // <-- see what backend returns
      setEducations(res.data);
    })
    .catch(err => console.log(err));
}, []);

  const handlePlusClick = () => {
    if (!isAuthorized) setShowCodePrompt(true);
    else setShowForm(true);
  };

  const handleAddEducation = () => {
    if (!formData.institute || !formData.degree || !formData.year || !formData.cgpa || !formData.percentage) {
      alert("Please fill out all fields.");
      return;
    }

    axios.post("http://localhost:5000/api/educations", formData)
      .then(res => {
        setEducations(prev => [...prev, res.data]);
        setFormData({ institute: "", degree: "", year: "", cgpa: "", percentage: "" });
        setShowForm(false);
      })
      .catch(err => console.log(err));
  };

  const removeEducation = (id) => {
    axios.delete(`http://localhost:5000/api/educations/${id}`)
      .then(() => setEducations(prev => prev.filter(e => e._id !== id)))
      .catch(err => console.log(err));
  };

  const handleCodeSubmit = () => {
    if (codeInput === secretCode) { setIsAuthorized(true); setShowForm(true); }
    else alert("Wrong code! You cannot add new education.");
    setShowCodePrompt(false); setCodeInput("");
  };

  return (
    <section className="py-12 px-6 text-white">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#38bdf8] px-16">My Education</h2>
        <button onClick={handlePlusClick} className="bg-[#38bdf8] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#0ea5e9] transition">+</button>
      </div>

      <div className="py-12 px-18 flex flex-wrap gap-6 justify-center md:justify-start">
        {educations.map((edu, index) => {
          let initialAnim = {};
          if (isMobile) initialAnim = { opacity: 0, y: 50 };
          else if (index % 3 === 0) initialAnim = { opacity: 0, x: -100 };
          else if (index % 3 === 1) initialAnim = { opacity: 0, y: -100 };
          else initialAnim = { opacity: 0, x: 100 };

          return (
            <motion.div
              key={edu._id}
              className="relative flex-1 basis-full sm:basis-[45%] md:basis-[30%] max-w-full sm:max-w-[45%] md:max-w-[30%]"
              initial={initialAnim}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <EducationCard {...edu} onRemove={() => removeEducation(edu._id)} />
            </motion.div>
          );
        })}
      </div>

      {showCodePrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#1e293b]/80 text-black p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-center text-[#38bdf8]">Enter Secret Code</h3>
            <input type="password" placeholder="Secret Code" value={codeInput} onChange={(e) => setCodeInput(e.target.value)} className="p-2 border rounded w-full text-black"/>
            <div className="flex justify-between mt-6">
              <button onClick={() => setShowCodePrompt(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleCodeSubmit} className="bg-[#38bdf8] text-black px-4 py-2 rounded hover:bg-[#0ea5e9]">Submit</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#1e293b]/80 text-black p-6 rounded-lg shadow-lg w-96 flex flex-col gap-3">
            <h3 className="text-xl font-bold mb-4 text-center text-[#38bdf8]">Add New Education</h3>
            <input type="text" placeholder="Institute" value={formData.institute} onChange={e => setFormData({...formData, institute: e.target.value})} className="p-2 border rounded"/>
            <input type="text" placeholder="Degree" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} className="p-2 border rounded"/>
            <input type="text" placeholder="Year" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="p-2 border rounded"/>
            <input type="text" placeholder="CGPA" value={formData.cgpa} onChange={e => setFormData({...formData, cgpa: e.target.value})} className="p-2 border rounded"/>
            <input type="number" placeholder="Percentage" value={formData.percentage} onChange={e => setFormData({...formData, percentage: e.target.value})} className="p-2 border rounded"/>
            <div className="flex justify-between mt-4">
              <button onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleAddEducation} className="bg-[#38bdf8] text-black px-4 py-2 rounded hover:bg-[#0ea5e9]">Add</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
