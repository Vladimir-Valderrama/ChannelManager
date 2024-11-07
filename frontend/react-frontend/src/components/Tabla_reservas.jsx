import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSVLink } from 'react-csv';

export default function TablaReservas() {
  const { token, refreshToken } = useContext(AuthContext);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservas, setSelectedReservas] = useState([]);
  const [hasRefreshed, setHasRefreshed] = useState(false); // Bandera para saber si ya se intentó actualizar

  // Función para formatear los datos para CSV
  const formatReservasForCSV = (reservas) => {
    return reservas.map((reserva) => ({
      BookingReference: reserva.bookingReference || 'N/A',
      FirstName: reserva.guest?.firstName || 'N/A',
      LastName: reserva.guest?.lastName || 'N/A',
      Email: reserva.guest?.email || 'N/A',
      Blacklisted: reserva.guest?.blacklisted ? 'Yes' : 'No',
      CreatedAt: reserva.guest?.createdAt ? new Date(reserva.guest.createdAt).toLocaleString() : 'N/A',
      UpdatedAt: reserva.guest?.updatedAt ? new Date(reserva.guest.updatedAt).toLocaleString() : 'N/A',
    }));
  };

  // Definir los encabezados del CSV
  const csvHeaders = [
    { label: 'Booking Reference', key: 'BookingReference' },
    { label: 'First Name', key: 'FirstName' },
    { label: 'Last Name', key: 'LastName' },
    { label: 'Email', key: 'Email' },
    { label: 'Blacklisted', key: 'Blacklisted' },
    { label: 'Created At', key: 'CreatedAt' },
    { label: 'Updated At', key: 'UpdatedAt' },
  ];

  const fetchReservas = async () => {
    if (!token) {
      console.error('No hay token disponible. Esperando que se genere...');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/reservas', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        console.warn('Token no válido o ha expirado. Intentando refrescar...');
        if (!hasRefreshed) {
          await refreshToken();
          setHasRefreshed(true); // Marcar que ya se intentó refrescar
        } else {
          console.error('No se pudo refrescar el token.');
        }
        return;
      }

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setReservas(data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setHasRefreshed(false); // Reiniciar el intento de refresco antes de la llamada
    fetchReservas();
  }, [token]); // Llamar solo cuando el token cambie

  // Manejar la selección de todos los elementos
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedReservas(reservas);
    } else {
      setSelectedReservas([]);
    }
  };

  // Manejar la selección individual
  const handleCheckboxChange = (reserva) => {
    if (selectedReservas.includes(reserva)) {
      setSelectedReservas(selectedReservas.filter((item) => item !== reserva));
    } else {
      setSelectedReservas([...selectedReservas, reserva]);
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (reservas.length === 0) {
    return <p>No hay reservas disponibles.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Tabla de Reservas</h2>
      <div className="mb-3">
        <CSVLink
          data={formatReservasForCSV(selectedReservas.length > 0 ? selectedReservas : reservas)}
          headers={csvHeaders}
          filename={'reservas.csv'}
          className="btn btn-primary"
        >
          Descargar CSV {selectedReservas.length > 0 ? '(Seleccionadas)' : '(Todas)'}
        </CSVLink>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedReservas.length === reservas.length}
              />
            </th>
            <th>Booking Reference</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Blacklisted</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva, index) => (
            <tr key={reserva._id || index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedReservas.includes(reserva)}
                  onChange={() => handleCheckboxChange(reserva)}
                />
              </td>
              <td>{reserva.bookingReference || 'N/A'}</td>
              <td>{reserva.guest?.firstName || 'N/A'}</td>
              <td>{reserva.guest?.lastName || 'N/A'}</td>
              <td>{reserva.guest?.email || 'N/A'}</td>
              <td>{reserva.guest?.blacklisted ? 'Yes' : 'No'}</td>
              <td>{reserva.guest?.createdAt ? new Date(reserva.guest.createdAt).toLocaleString() : 'N/A'}</td>
              <td>{reserva.guest?.updatedAt ? new Date(reserva.guest.updatedAt).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
