import '../styles/informes.css'; // Importar CSS.
import { NavBar } from '../components/Navigation';
// Importaciones para crear las rutas a los componntes del navbar.
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppReservas from './reservas';
import AppStock from './stock';
import AppDescargas from './Descargas';
import AppHome from './Home';

function AppIndex() {
    return (
        <>
        <div>
            <Router>
                <NavBar/>

                {/* Definimos las rutas del navbar */}
                <Routes>
                    <Route path='/' element={<AppHome/>}/>
                    <Route path='/Reservas' element={<AppReservas/>}/>
                    <Route path='/Stock' element={<AppStock/>}/>
                    <Route path='/Descargas' element={<AppDescargas/>}/>
                </Routes>
            </Router>
        </div>
        </>
    );
}

export default AppIndex;
