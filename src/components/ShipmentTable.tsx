import type { Shipment } from "../types/Shipments";

export default function ShipmentTable({
  shipmentListData,
}: {
  shipmentListData: Shipment[];
}) {
  if (!shipmentListData || shipmentListData.length === 0) {
    return null;
  }

  return (
    <>
      <h2>Shipment List:</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Status</th>
          <th>Estimated Arrival</th>
        </tr>
        {shipmentListData.map((shipment) => (
          <tr key={shipment.id}>
            <td>{shipment.id}</td>
            <td>{shipment.origin}</td>
            <td>{shipment.destination}</td>
            <td>{shipment.status}</td>
            <td>{shipment.estimatedArrival}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
