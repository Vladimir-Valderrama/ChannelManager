import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TablaStock() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect para obtener los datos desde el endpoint de stock
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch('http://localhost:4003/stock');
        const data = await response.json();
        setStock(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el stock: ', error);
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (!stock || stock.length === 0) {
    return <p>No hay stock disponible.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Tabla de Stock</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Hotel ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Número de Habitaciones</th>
            <th>Categoría</th>
            <th>Servicios</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(hotel => (
            <tr key={hotel.hotel_id}>
              <td>{hotel.hotel_id}</td>
              <td>{hotel.nombre}</td>
              <td>{hotel.direccion}</td>
              <td>{hotel.numero_habitaciones}</td>
              <td>{hotel.categoria}</td>
              <td>
                <ul>
                  {hotel.servicios.map(servicio => (
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
}
