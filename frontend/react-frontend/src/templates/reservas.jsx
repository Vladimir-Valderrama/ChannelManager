import '../styles/reservas.css'; // Importar CSS.
import TablaReservas from '../components/Tabla_reservas';

// eslint-disable-next-line react/prop-types
function AppReservas({ reservas }) {
  return (
    <>
      <div>
        <TablaReservas reservas={reservas} />
      </div>  
    </>
  );
}

export default AppReservas;
