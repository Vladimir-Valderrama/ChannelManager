import React from 'react';

// eslint-disable-next-line react/prop-types
export default function TablaReservas({ reservas }) {
  if (!reservas || reservas.length === 0) {
    return <p>No hay reservas disponibles.</p>;
  }

  return (
    <div>
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
              <td>{reserva.ota_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
