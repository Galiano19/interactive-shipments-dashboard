import "./App.css";
import ShipmentTable from "./components/patterns/ShipmentTable/ShipmentTable";
import { useShipmentsList } from "./hooks/useShipmentsList";

function App() {
  const { data, refetch } = useShipmentsList();

  return (
    <div className="container">
      <div className="title-container">
        <h1> Interactive Shipment List</h1>
      </div>
      {!data && (
        <div className="introduction-container">
          <div>
            <p>
              This app loads mocked shipment data, lets you sort it by status
              and arrival date, and filter by status. You can open any shipment
              for quick editing and update it right away. Changes apply
              immediately, with loading state that disables the input elements
              and error feedback.
            </p>
            <p> - Carlos Galiano</p>
          </div>
          <div className="introduction-button-container">
            <button className="button" onClick={() => refetch()}>
              get shipment list
            </button>
          </div>
        </div>
      )}
      <ShipmentTable shipmentListData={data} />
    </div>
  );
}

export default App;
