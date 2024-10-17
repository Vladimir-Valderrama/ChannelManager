import React from 'react';

export default function TablaStock({ stock }) {
  if (!stock || stock.length === 0) {
    return <p>No hay stock disponible.</p>;
  }

  return (
    <div>
      <h2> Tabla de Stock</h2>
      <table>
        <thead>
          <tr>
            <th>hotel_id</th>
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
