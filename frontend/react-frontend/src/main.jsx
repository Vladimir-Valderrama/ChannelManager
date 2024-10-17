import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppReservas from './templates/reservas.jsx';
import AppStock from './templates/stock.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <AppReservas />
      <AppStock />
    </div>
  </StrictMode>
);
