import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AppReservas from './templates/reservas.jsx';
import AppStock from './templates/stock.jsx';
import AppInformes from './templates/informes.jsx';

function MainApp() {
  const [reservas, setReservas] = useState([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Reservas
        const reservasResponse = await fetch('http://localhost:4002/reservas');
        const reservasData = await reservasResponse.json();

        // Fetch Stock
        const stockResponse = await fetch('http://localhost:4003/stock');
        const stockData = await stockResponse.json();

        // Guardar los datos obtenidos en el estado
        setReservas(reservasData);
        setStock(stockData);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <StrictMode>
      <div>
        {/* Pasar los datos como props a los componentes */}
        <AppReservas reservas={reservas} />
        <AppStock stock={stock} />
        <AppInformes reservas={reservas} stock={stock} />
      </div>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<MainApp />);
