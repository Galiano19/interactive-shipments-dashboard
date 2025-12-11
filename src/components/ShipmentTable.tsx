import { useEffect, useState } from "react";
import type { Shipment, ShipmentStatus } from "../types/Shipments";
import FilterDropdown from "./FilterDropdown";

export default function ShipmentTable({
  shipmentListData,
}: {
  shipmentListData: Shipment[];
}) {
  const [filteredStatus, setFilteredStatus] = useState<ShipmentStatus | "">("");
  const [shipmentsList, setShipmentsList] = useState(shipmentListData);
  const [sortStatusOrder, setSortStatusOrder] = useState<
    "asc" | "desc" | undefined
  >(undefined);
  const [sortArrivalDateOrder, setSortArrivalDateOrder] = useState<
    "asc" | "desc" | undefined
  >(undefined);

  useEffect(() => {
    setShipmentsList(shipmentListData);
  }, [shipmentListData]);

  function sortList({
    list,
    order,
    item,
  }: {
    list: Shipment[];
    order: "asc" | "desc" | undefined;
    item: "status" | "date-arrival";
  }) {
    let sortedList = list;
    let currentOrder = order;
    if (order === undefined || order === "desc") {
      if (item === "status") {
        sortedList = [...list].sort((a, b) => a.status.localeCompare(b.status));
      } else {
        sortedList = [...list].sort((a, b) =>
          a.estimatedArrival.localeCompare(b.estimatedArrival)
        );
      }
      currentOrder = "asc";
    } else {
      if (item === "status") {
        sortedList = [...list].sort((a, b) => b.status.localeCompare(a.status));
      } else {
        sortedList = [...list].sort((a, b) =>
          b.estimatedArrival.localeCompare(a.estimatedArrival)
        );
      }
      currentOrder = "desc";
    }

    return { sortedList, currentOrder };
  }

  const handleSortByStatus = () => {
    const orderedList = sortList({
      list: shipmentsList,
      order: sortStatusOrder,
      item: "status",
    });
    setShipmentsList(orderedList.sortedList);
    setSortStatusOrder(orderedList.currentOrder);

    // Restarting the other states so they will start again once cliciked
    setSortArrivalDateOrder(undefined);
  };

  const handleSortByEstimatedArrival = () => {
    const orderedList = sortList({
      list: shipmentsList,
      order: sortArrivalDateOrder,
      item: "date-arrival",
    });
    setShipmentsList(orderedList.sortedList);
    setSortArrivalDateOrder(orderedList.currentOrder);

    setSortStatusOrder(undefined);
  };

  if (!shipmentListData || shipmentListData.length === 0) {
    return null;
  }

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
              <button onClick={handleSortByStatus}>Status</button>
            </th>
            <th>
              <button onClick={handleSortByEstimatedArrival}>
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
