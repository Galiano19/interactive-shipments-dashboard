import { useState } from "react";
import "./App.css";
import { getShipments } from "./api/getShipments";
import type { Shipment } from "./types/Shipments";
import ShipmentTable from "./components/ShipmentTable";

function App() {
  const [shipmentList, setShipmentList] = useState<Shipment[]>([]);

  const handleClick = async () => {
    const response = await getShipments();
    setShipmentList(response);
  };

  return (
    <>
      <h1> Interactive Shipment List</h1>
      <button onClick={() => handleClick()}>get shipment list</button>
      <ShipmentTable shipmentListData={shipmentList} />
    </>
  );
}

export default App;
