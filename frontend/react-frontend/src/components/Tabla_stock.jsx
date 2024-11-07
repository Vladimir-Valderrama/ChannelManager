import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSVLink } from 'react-csv';

export default function TablaStock() {
  const { token, refreshToken } = useContext(AuthContext);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState([]);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  // Función para formatear los datos para CSV
  const formatStockForCSV = (stock) => {
    return stock.map((item) => ({
      ID: item.room._id,
      RoomNumber: item.room.roomNumber,
      Type: item.room.type,
      BasePrice: `$${item.room.basePrice.toFixed(2)}`,
      Capacity: item.room.capacity,
      Status: item.room.status,
      Description: item.room.description,
      Amenities: Array.isArray(item.room.amenities) ? item.room.amenities.join(', ') : 'Sin servicios',
    }));
  };

  // Definir los encabezados del CSV
  const csvHeaders = [
    { label: 'ID', key: 'ID' },
    { label: 'Room Number', key: 'RoomNumber' },
    { label: 'Type', key: 'Type' },
    { label: 'Base Price', key: 'BasePrice' },
    { label: 'Capacity', key: 'Capacity' },
    { label: 'Status', key: 'Status' },
    { label: 'Description', key: 'Description' },
    { label: 'Amenities', key: 'Amenities' },
  ];

  const fetchStock = async () => {
    if (!token) {
      console.error('No hay token disponible. Esperando que se genere...');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/stock', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401 && !hasRefreshed) {
        console.warn('Token no válido o ha expirado. Intentando refrescar...');
        await refreshToken();
        setHasRefreshed(true);
        fetchStock(); // Reintentar después de actualizar el token
        return;
      }

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setStock(data);
    } catch (error) {
      console.error('Error al obtener el stock:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, [token]);

  // Manejar la selección de todos los elementos
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStock(stock);
    } else {
      setSelectedStock([]);
    }
  };

  // Manejar la selección individual
  const handleCheckboxChange = (item) => {
    if (selectedStock.includes(item)) {
      setSelectedStock(selectedStock.filter((selected) => selected !== item));
    } else {
      setSelectedStock([...selectedStock, item]);
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (stock.length === 0) {
    return <p>No hay stock disponible.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Tabla de Stock de Habitaciones</h2>
      <div className="mb-3">
        <CSVLink
          data={formatStockForCSV(selectedStock.length > 0 ? selectedStock : stock)}
          headers={csvHeaders}
          filename={'stock_habitaciones.csv'}
          className="btn btn-primary"
        >
          Descargar CSV {selectedStock.length > 0 ? '(Seleccionadas)' : '(Todas)'}
        </CSVLink>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedStock.length === stock.length}
              />
            </th>
            <th>ID Habitación</th>
            <th>Número de Habitación</th>
            <th>Tipo</th>
            <th>Precio Base</th>
            <th>Capacidad</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Servicios</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.room._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStock.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
              </td>
              <td>{item.room._id}</td>
              <td>{item.room.roomNumber}</td>
              <td>{item.room.type}</td>
              <td>{`$${item.room.basePrice.toFixed(2)}`}</td>
              <td>{item.room.capacity}</td>
              <td>{item.room.status}</td>
              <td>{item.room.description}</td>
              <td>
                <ul>
                  {Array.isArray(item.room.amenities) && item.room.amenities.length > 0 ? (
                    item.room.amenities.map((amenity, index) => <li key={index}>{amenity}</li>)
                  ) : (
                    <li>Sin servicios</li>
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
