import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import './styles/Global.css';

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/info" element={<InfoPage />} />
                    {/* Redirigir automáticamente a /home cuando se accede a la raíz */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
