import { shipmentStatus } from "../constants/shipmentStatus";
import type { ShipmentStatus } from "../types/Shipments";

export default function FilterDropdown({
  setFilteredStatus,
}: {
  setFilteredStatus: (status: ShipmentStatus | "") => void;
}) {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ShipmentStatus | "";
    setFilteredStatus(value);
  };

  return (
    <div>
      <label htmlFor="status-filter">Filter by Status:</label>
      <select
        id="status-filter"
        name="status-filter"
        onChange={(e) => handleOnChange(e)}
      >
        <option value="">All</option>
        {shipmentStatus.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
