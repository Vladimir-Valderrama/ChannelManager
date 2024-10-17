//* eslint-disable react/prop-types */}
/* Componente para listar las reservas como tabla*/
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

export default function TablaStock(){
    // Use state para las reservas y el loading.
    const [stock, setStock] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await fetch('http://localhost:4003/stock');
                const data = await response.json();
                setStock(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las reservas: ', error);
                setLoading(false);
            }
        }
        
        fetchStock();
    }, []);

    if (loading){
        return <p>Cargando Stock...</p>;
    }

    return (
        <div>
            {/* Recorrer la base de datos y rellenar la tabla*/}
            <h2> Tabla de Stock</h2>
            <table>
                <thead>
                    <tr>
                        <th>hotel_id</th>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Numero_habitaciones</th>
                        <th>Categoria</th>
                        <th>Servicios</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map(stock => (
                        <tr key={stock.hotel_id}>
                            <td>{stock.hotel_id}</td>
                            <td>{stock.nombre}</td>
                            <td>{stock.direccion}</td>
                            <td>{stock.numero_habitaciones}</td>
                            <td>{stock.categoria}</td>
                            <td>
                                {/* Mapea y muestra los servicios del hotel */}
                                <ul>
                                    {stock.servicios.map(servicio => (
                                        <li key={servicio.servicio_id}>
                                            {servicio.descripcion} - ${servicio.costo}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};