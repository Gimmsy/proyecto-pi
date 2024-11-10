import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client'
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Crea un "root" desde el contenedor

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
