// eslint-disable-next-line no-unused-vars
import React from 'react';
import { saveAs } from 'file-saver';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener esta línea para los estilos

// eslint-disable-next-line react/prop-types
export default function DescargarDatos({ reservas, stock }) {
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
        const headers = [
            "ID Reserva",
            "Fecha Reserva",
            "Fecha Entrada",
            "Fecha Salida",
            "Estado Reserva",
            "Hotel ID",
            "Ota ID"
        ];

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
        const headers = [
            "Hotel ID",
            "Nombre",
            "Direccion",
            "Numero de Habitaciones",
            "Categoria",
            "Servicios"
        ];

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
