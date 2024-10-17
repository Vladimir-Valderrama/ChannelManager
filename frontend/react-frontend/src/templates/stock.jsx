import '../styles/stock.css'; // Importar CSS.
import TablaStock from '../components/tabla_stock';

// eslint-disable-next-line react/prop-types
function AppStock({ stock }) {
  return (
    <>
      <div>
        <TablaStock stock={stock} />
      </div>  
    </>
  );
}

export default AppStock;
