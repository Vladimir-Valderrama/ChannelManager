import React, { useEffect, useState } from 'react';
import TablaReservas from '../components/Tabla_reservas';

function AppReservas() {
  const [tokenReady, setTokenReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setTokenReady(true);
    } else {
      // Observa el localStorage para ver si el token se agrega más tarde.
      const checkToken = setInterval(() => {
        const newToken = localStorage.getItem('authToken');
        if (newToken) {
          setTokenReady(true);
          clearInterval(checkToken);
        }
      }, 500);
    }
  }, []);

  if (!tokenReady) {
    return <p>Cargando token...</p>;
  }

  return (
    <div>
      <TablaReservas />
    </div>
  );
}

export default AppReservas;
