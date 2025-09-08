import { useEffect } from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "./Components/Home/Home";
import { About } from "./Components/About/About";
import { Projects } from "./Components/Projects/Projects";
import { Education } from "./Components/Education/Education";
import { Footer } from "./Components/Footer/Footer";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#171d32] h-auto w-full overflow-hidden">
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Education />
      <Footer />
    </div>
  );
}

export default App;
