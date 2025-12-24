import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ImageGallery from "./images/imageGallery.tsx";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import Navbar from "./components/NavBar.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.jsx.tsx";
import Portfolio from "./pages/Portfolio.tsx";

function App() {
    return (
        <div className="min-h-screen w-full bg-white">

            <Router>
                <Navbar/>

                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/gallery" element={<ImageGallery/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/portfolio" element={<Portfolio/>}/>
                </Routes>
            </Router>

        </div>
    );
}

export default App;