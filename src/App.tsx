import { useState } from "react";
import "./App.css";
import { getShipments } from "./api/getShipments";
import type { Shipment } from "./types/Shipments";

function App() {
  const [shipmentList, setShipmentList] = useState<Shipment[]>([]);

  const handleClick = async () => {
    const response = await getShipments();
    setShipmentList(response);
  };

  return (
    <>
      <h1> Interactive Shipment List</h1>
      <div className="card">
        <button onClick={() => handleClick()}>get shipment list</button>
      </div>
      {shipmentList.length > 0 && (
        <div>
          <h2>Shipment List:</h2>
          <ul>
            {shipmentList.map((shipment) => (
              <li key={shipment.id}>
                {shipment.id} - {shipment.origin} to {shipment.destination} (
                {shipment.status})
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
