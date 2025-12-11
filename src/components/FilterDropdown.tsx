import type { ShipmentStatus } from "../types/Shipments";

const shipmentStatuses: ShipmentStatus[] = [
  "Booked",
  "In Transit",
  "Delivered",
  "Cancelled",
];

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
        {shipmentStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
