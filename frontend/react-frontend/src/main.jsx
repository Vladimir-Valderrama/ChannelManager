import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppIndex from "./templates";

// Funcion main para renderizar todas las cosas.
function MainApp(){
    return (
        <StrictMode>
            <AppIndex/>
        </StrictMode>
    )
}

createRoot(document.getElementById('root')).render(<MainApp />);