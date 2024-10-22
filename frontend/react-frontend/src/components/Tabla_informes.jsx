import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DescargarDatos() {
    const [reservas, setReservas] = useState([]);
    const [stock, setStock] = useState([]);
    const [loading, setLoading] = useState(true);

  // useEffect para obtener los datos de reservas y stock
useEffect(() => {
    const fetchData = async () => {
    try {
        // Fetch Reservas
        const reservasResponse = await fetch('http://localhost:4002/reservas');
        const reservasData = await reservasResponse.json();
        setReservas(reservasData);

        // Fetch Stock
        const stockResponse = await fetch('http://localhost:4003/stock');
        const stockData = await stockResponse.json();
        setStock(stockData);

        setLoading(false); // Datos cargados
    } catch (error) {
        console.error('Error al obtener los datos: ', error);
        setLoading(false);
    }
    };

    fetchData(); // Llamada para obtener los datos
  }, []); // Solo se ejecuta una vez al montar el componente

  // Función para generar CSV con encabezados y descargarlo
    const downloadCSV = (headers, data, filename) => {
    const headerRow = headers.join(',');
    const dataRows = data.map(row =>
    Object.values(row).join(',')
    ).join('\n');

    const csvContent = `${headerRow}\n${dataRows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
};

  // Manejar la descarga de Reservas
    const handleDownloadReservas = () => {
    // Headers del CSV.
    const headers = [
    "ID Reserva",
    "Fecha Reserva",
    "Fecha Entrada",
    "Fecha Salida",
    "Estado Reserva",
    "Hotel ID",
    "Ota ID"
    ];

    // Datos del CSV.
    const reservasData = reservas.map(reserva => ({
    "ID Reserva": reserva.reserva_id,
    "Fecha Reserva": reserva.fecha_reserva,
    "Fecha Entrada": reserva.fecha_entrada,
    "Fecha Salida": reserva.fecha_salida,
    "Estado Reserva": reserva.estado_reserva,
    "Hotel ID": reserva.hotel_id,
    "Ota ID": reserva.ota_id,
    }));

    downloadCSV(headers, reservasData, 'reservas');
};

  // Manejar la descarga de Stock
const handleDownloadStock = () => {
    // Headers del CSV.
    const headers = [
    "Hotel ID",
    "Nombre",
    "Direccion",
    "Numero de Habitaciones",
    "Categoria",
    "Servicios"
    ];

    // Datos del CSV.
    const stockData = stock.map(hotel => ({
    "Hotel ID": hotel.hotel_id,
    "Nombre": hotel.nombre,
    "Direccion": hotel.direccion,
    "Numero de Habitaciones": hotel.numero_habitaciones,
    "Categoria": hotel.categoria,
    "Servicios": hotel.servicios.map(servicio => `${servicio.descripcion} - $${servicio.costo}`).join(' | ')
    }));

    downloadCSV(headers, stockData, 'stock');
};

  // Mostrar un mensaje de carga mientras se obtienen los datos
if (loading) {
    return <p>Cargando datos...</p>;
}

return (
    <div className="container mt-4">
    <h2 className="text-center">Descargar Datos</h2>
    <div className="text-center">
        {/* Botón para descargar Reservas */}
        <button className="btn btn-primary mx-2" onClick={handleDownloadReservas}>
            Descargar Reservas como CSV
        </button>

        {/* Botón para descargar Stock */}
        <button className="btn btn-secondary mx-2" onClick={handleDownloadStock}>
            Descargar Stock como CSV
        </button>
        </div>
    </div>
    );
}
