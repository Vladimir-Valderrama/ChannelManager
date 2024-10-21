import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TablaReservas({ reservas }) {
  if (!reservas || reservas.length === 0) {
    return <p>No hay reservas disponibles.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Tabla de Reservas</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
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
