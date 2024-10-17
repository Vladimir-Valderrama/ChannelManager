//* eslint-disable react/prop-types */}
/* Componente para listar las reservas como tabla*/
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

export default function TablaReservas(){
    // Use state para las reservas y el loading.
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await fetch('http://localhost:4002/reservas');
                const data = await response.json();
                setReservas(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las reservas: ', error);
                setLoading(false);
            }
        }
        
        fetchReservas();
    }, []);

    if (loading){
        return <p>Cargando Reservas...</p>;
    }

    return (
        <div>
            {/* Recorrer la base de datos y rellenar la tabla*/}
            <h2> Tabla de Reservas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Reserva</th>
                        <th>Fecha Reserva</th>
                        <th>Fecha Entrada</th>
                        <th>Fecha Salida</th>
                        <th>Estado Reserva</th>
                        <th>Hotel ID</th>
                        <th>Usuario ID</th>
                        <th>Ota ID</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map(reserva => (
                        <tr key={reserva.reserva_id}>
                            <td>{reserva.reserva_id}</td>
                            <td>{reserva.fecha_reserva}</td>
                            <td>{reserva.fecha_entrada}</td>
                            <td>{reserva.fecha_salida}</td>
                            <td>{reserva.estado_reserva}</td>
                            <td>{reserva.hotel_id}</td>
                            <td>{reserva.usuario_id}</td>
                            <td>{reserva.ota_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};