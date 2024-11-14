import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import './styles/Global.css';
import WaterCycle from "./pages/Cycle";

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/info" element={<InfoPage />} />
                    {/* Redirigir automáticamente a /home cuando se accede a la raíz */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                    <Route path="/WaterCycle" element={<WaterCycle />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
