// * eslint-disable react/jsx-key */
import '../styles/informes.css'; // Importar CSS.
import DescargarDatos from '../components/Tabla_informes';

// eslint-disable-next-line react/prop-types
function AppInformes({ reservas, stock }) {
  return (
    <>
    <div>
        <DescargarDatos reservas={reservas} stock={stock} />
    </div>  
    </>
);
}

export default AppInformes;
