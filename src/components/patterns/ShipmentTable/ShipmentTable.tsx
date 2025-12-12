import { useEffect, useState } from "react";
import type {
  Shipment,
  ShipmentsOrder,
  ShipmentStatus,
} from "../../../types/Shipments";
import { getOrderedList } from "../../../utils/getOrderedList";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import DetailedShipment from "../DetailedShipment/DetailedShipment";
import "./ShipmentTable.css";

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
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );

  const handleRowClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
  };

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
    <div className="shipment-table-area-container">
      <div className="filter-area">
        <FilterDropdown setFilteredStatus={setFilteredStatus} />
      </div>
      <div className="table-area">
        <div className="table-container">
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
                  <tr
                    key={shipment.id}
                    role="button"
                    className="table_row"
                    onClick={() => handleRowClick(shipment)}
                  >
                    <td>{shipment.id}</td>
                    <td>{shipment.origin}</td>
                    <td>{shipment.destination}</td>
                    <td>{shipment.status}</td>
                    <td>
                      {new Date(shipment.estimatedArrival).toLocaleString(
                        "en-EN",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {selectedShipment && (
            <DetailedShipment
              shipment={selectedShipment}
              onClose={() => setSelectedShipment(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
