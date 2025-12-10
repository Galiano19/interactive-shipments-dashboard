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
      <button onClick={() => handleClick()}>get shipment list</button>
      {shipmentList.length > 0 && (
        <div>
          <h2>Shipment List:</h2>
          <table>
            <tr>
              <th>ID</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Estimated Arrival</th>
            </tr>
            {shipmentList.map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.id}</td>
                <td>{shipment.origin}</td>
                <td>{shipment.destination}</td>
                <td>{shipment.status}</td>
                <td>{shipment.estimatedArrival}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </>
  );
}

export default App;
