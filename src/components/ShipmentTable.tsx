import { useEffect, useState } from "react";
import type {
  Shipment,
  ShipmentsOrder,
  ShipmentStatus,
} from "../types/Shipments";
import FilterDropdown from "./FilterDropdown";
import { getOrderedList } from "../utils/getOrderedList";

export default function ShipmentTable({
  shipmentListData,
}: {
  shipmentListData?: Shipment[];
}) {
  if (!shipmentListData || shipmentListData.length === 0) {
    return null;
  }

  const [filteredStatus, setFilteredStatus] = useState<ShipmentStatus | "">("");
  const [shipmentsList, setShipmentsList] = useState(shipmentListData);
  const [sortStatusOrder, setSortStatusOrder] =
    useState<ShipmentsOrder>(undefined);
  const [sortArrivalDateOrder, setSortArrivalDateOrder] =
    useState<ShipmentsOrder>(undefined);

  useEffect(() => {
    setShipmentsList(shipmentListData);
  }, [shipmentListData]);

  const handleOrderByStatus = () => {
    const orderedList = getOrderedList({
      list: shipmentsList,
      order: sortStatusOrder,
      item: "status",
    });
    setShipmentsList(orderedList.sortedList);
    setSortStatusOrder(orderedList.currentOrder);

    // Restarting the other states so they will start again once cliciked
    setSortArrivalDateOrder(undefined);
  };

  const handleOrderByEstimatedArrival = () => {
    const orderedList = getOrderedList({
      list: shipmentsList,
      order: sortArrivalDateOrder,
      item: "date-arrival",
    });
    setShipmentsList(orderedList.sortedList);
    setSortArrivalDateOrder(orderedList.currentOrder);

    setSortStatusOrder(undefined);
  };

  return (
    <>
      <h2>Shipment List:</h2>
      <FilterDropdown setFilteredStatus={setFilteredStatus} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>
              <button onClick={handleOrderByStatus}>Status</button>
            </th>
            <th>
              <button onClick={handleOrderByEstimatedArrival}>
                Estimated Arrival
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {shipmentsList
            .filter(
              (shipment) =>
                filteredStatus === "" || shipment.status === filteredStatus
            )
            .map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.id}</td>
                <td>{shipment.origin}</td>
                <td>{shipment.destination}</td>
                <td>{shipment.status}</td>
                <td>{shipment.estimatedArrival}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
