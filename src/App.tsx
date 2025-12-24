import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ImageGallery from "./images/imageGallery.tsx";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import Navbar from "./components/NavBar.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.jsx.tsx";
import Campaign from "./pages/Campaign.tsx";
import Shows from "./pages/Shows.tsx";
import Editorials from "./pages/Editorials.tsx";

function App() {
    return (
        <div className="min-h-screen w-full bg-white">

            <Router>
                <Navbar/>

                <Routes>
                    <Route path="/jack-portfolio" element={<LandingPage/>}/>
                    <Route path="/jack-portfolio/gallery" element={<ImageGallery/>}/>
                    <Route path="/jack-portfolio/contact" element={<Contact/>}/>
                    <Route path="/jack-portfolio/about" element={<About/>}/>ì
                    <Route path="/jack-portfolio/campaign" element={<Campaign/>}/>
                    <Route path="/jack-portfolio/shows" element={<Shows/>}/>
                    <Route path="/jack-portfolio/editorials" element={<Editorials/>}/>
                </Routes>
            </Router>

        </div>
    );
}

export default App;