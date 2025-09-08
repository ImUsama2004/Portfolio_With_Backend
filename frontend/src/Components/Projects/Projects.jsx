import React, { useState, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";
import axios from "axios";

import pic3 from "../../assets/coffee.webp";
import pic1 from "../../assets/elearn.webp";
import pic2 from "../../assets/portfolio.webp";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", demo: "", code: "", image: null });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showCodePrompt, setShowCodePrompt] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const secretCode = "MYSECRET123";

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch projects
  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then(res => {
        const data = res.data;
        const projectsWithImages = data.map((proj, index) => {
          let img = pic1;
          if (index === 0) img = pic1;
          else if (index === 1) img = pic2;
          else if (index === 2) img = pic3;
          return { ...proj, image: img };
        });
        setProjects(projectsWithImages);
      })
      .catch(err => console.log(err));
  }, []);

  const handlePlusClick = () => {
    if (!isAuthorized) setShowCodePrompt(true);
    else setShowForm(true);
  };

  const handleAddProject = () => {
    if (!formData.title || !formData.description || !formData.demo || !formData.code || !formData.image) {
      alert("Please fill all fields.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("demo", formData.demo);
    data.append("code", formData.code);
    data.append("image", formData.image);

    axios.post("http://localhost:5000/api/projects", data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => {
        setProjects(prev => [...prev, res.data]);
        setFormData({ title: "", description: "", demo: "", code: "", image: null });
        setShowForm(false);
      })
      .catch(err => console.log(err));
  };

  const handleDeleteProject = (id) => {
    axios.delete(`http://localhost:5000/api/projects/${id}`)
      .then(() => setProjects(prev => prev.filter(p => p._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div id="Projects" className="p-10 md:p-24 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl text-[#38bdf8] font-bold">Projects</h1>
        <button onClick={handlePlusClick} className="bg-[#38bdf8] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#0ea5e9] transition text-xl">+</button>
      </div>

      <div className="flex flex-wrap gap-6 mt-10">
        {projects.map((project, index) => {
          let initialAnim = {};
          if (isMobile) initialAnim = { opacity: 0, y: 50 };
          else if (index % 3 === 0) initialAnim = { opacity: 0, x: -100 };
          else if (index % 3 === 1) initialAnim = { opacity: 0, y: -100 };
          else initialAnim = { opacity: 0, x: 100 };

          return (
            <motion.div
              key={project._id}
              className="relative overflow-visible"
              initial={initialAnim}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                demo={project.demo}
                code={project.code}
                image={project.image}
                onDelete={() => handleDeleteProject(project._id)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Secret Code Prompt */}
      {showCodePrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#1e293b]/80 text-black p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-center text-[#38bdf8]">Enter Secret Code</h3>
            <input
              type="password"
              placeholder="Secret Code"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="p-2 border rounded w-full text-black"
            />
            <div className="flex justify-between mt-6">
              <button onClick={() => setShowCodePrompt(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={() => {
                if (codeInput === secretCode) { setIsAuthorized(true); setShowForm(true); }
                else alert("Wrong code! You cannot add new projects.");
                setShowCodePrompt(false); setCodeInput("");
              }} className="bg-[#38bdf8] text-black px-4 py-2 rounded hover:bg-[#0ea5e9]">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#1e293b]/80 text-black p-6 rounded-lg shadow-lg w-96 flex flex-col gap-3">
            <h3 className="text-xl font-bold mb-4 text-center text-[#38bdf8]">Add New Project</h3>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="p-2 border rounded" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="p-2 border rounded" rows={3} />
            <input type="text" name="demo" placeholder="Demo URL" value={formData.demo} onChange={e => setFormData({...formData, demo: e.target.value})} className="p-2 border rounded" />
            <input type="text" name="code" placeholder="Code Link" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="p-2 border rounded" />
            <input type="file" name="image" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="p-2 border rounded bg-white" />
            <div className="flex justify-between mt-4">
              <button onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleAddProject} className="bg-[#38bdf8] text-black px-4 py-2 rounded hover:bg-[#0ea5e9]">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
