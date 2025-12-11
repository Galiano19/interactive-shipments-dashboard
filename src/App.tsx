import "./App.css";
import ShipmentTable from "./components/ShipmentTable";
import { useShipmentsList } from "./hooks/useShipmentsList";

function App() {
  const { data, refetch } = useShipmentsList();

  return (
    <>
      <h1> Interactive Shipment List</h1>
      <button onClick={() => refetch()}>get shipment list</button>
      <ShipmentTable shipmentListData={data} />
    </>
  );
}

export default App;
