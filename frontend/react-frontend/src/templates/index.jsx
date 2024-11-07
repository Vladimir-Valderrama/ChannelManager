// index.js
import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { NavBar } from '../components/Navigation';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppReservas from './reservas';
import AppStock from './stock';
import AppHome from './Home';

function AppIndex() {
    const { loadingToken } = useContext(AuthContext);

    if (loadingToken) {
        return <p>Cargando token...</p>;
    }

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path='/' element={<AppHome />} />
                <Route path='/Reservas' element={<AppReservas />} />
                <Route path='/Stock' element={<AppStock />} />
            </Routes>
        </Router>
    );
}

function MainApp() {
    return (
        <AuthProvider>
            <AppIndex />
        </AuthProvider>
    );
}

export default MainApp;
