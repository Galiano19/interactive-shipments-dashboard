import { useState } from "react";
import type { Shipment, ShipmentStatus } from "../types/Shipments";
import FilterDropdown from "./FilterDropdown";

export default function ShipmentTable({
  shipmentListData,
}: {
  shipmentListData: Shipment[];
}) {
  const [filteredStatus, setFilteredStatus] = useState<ShipmentStatus | "">("");

  if (!shipmentListData || shipmentListData.length === 0) {
    return null;
  }

  return (
    <>
      <h2>Shipment List:</h2>
      <FilterDropdown setFilteredStatus={setFilteredStatus} />
      <table>
        <tr>
          <th>ID</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Status</th>
          <th>Estimated Arrival</th>
        </tr>
        {shipmentListData.map(
          (shipment) =>
            (filteredStatus === "" || shipment.status === filteredStatus) && (
              <tr key={shipment.id}>
                <td>{shipment.id}</td>
                <td>{shipment.origin}</td>
                <td>{shipment.destination}</td>
                <td>{shipment.status}</td>
                <td>{shipment.estimatedArrival}</td>
              </tr>
            )
        )}
      </table>
    </>
  );
}
