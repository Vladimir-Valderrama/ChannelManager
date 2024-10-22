// * eslint-disable react/jsx-key */
import '../styles/informes.css'; // Importar CSS.
import DescargarDatos from '../components/Tabla_informes';

function AppDescargas({ reservas, stock }) {
  return (
    <>
    <div>
        <DescargarDatos reservas={reservas} stock={stock} />
    </div>  
    </>
  );
}

export default AppDescargas;
