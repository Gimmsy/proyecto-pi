import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OceanBackground from "./components/OceanBackground";
import './styles/Global.css';

const App = () => {
    return (
        <div>
            <OceanBackground />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;