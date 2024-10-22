import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppIndex from "./templates";

// Funcion main para renderizar todas las cosas.
function MainApp(){
    return (
        <div>
            <StrictMode>
                <AppIndex/>
            </StrictMode>
        </div>
    )
}


// Render de la pantalla principal.
createRoot(document.getElementById('root')).render(<MainApp />);