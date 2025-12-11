import type { Shipment, ShipmentStatus } from "../types/Shipments";
import Dialog from "./ui/dialog/dialog";
import "./DetailedShipment.css";
import { useState } from "react";
import { shipmentStatus } from "../constants/shipmentStatus";

interface DetailedShipmentProps {
  shipment: Shipment;
  onClose: () => void;
}

export default function DetailedShipment({
  shipment,
  onClose,
}: DetailedShipmentProps) {
  const [formValues, setFormValues] = useState({
    origin: shipment.origin,
    destination: shipment.destination,
    status: shipment.status,
    estimatedArrival: shipment.estimatedArrival,
  });

  function handleDestinationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      ["destination"]: value,
    }));
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      ["status"]: value as ShipmentStatus,
    }));
  }

  function handleSave() {
    console.log("Updated shipment:", { formValues });

    onClose();
  }

  return (
    <Dialog title={shipment.id} defaultOpen onClose={onClose}>
      <Dialog.Body>
        <form className="edit_form">
          <div className="edit_form_row">
            <label htmlFor="origin">Origin:</label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formValues.origin}
            />
          </div>
          <div className="edit_form_row">
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formValues.destination}
              onChange={handleDestinationChange}
            />
          </div>
          <div className="edit_form_row">
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" onChange={handleStatusChange}>
              {shipmentStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="edit_form_row">
            <label htmlFor="estimatedArrival">Estimated Arrival:</label>
            <input
              type="text"
              id="estimatedArrival"
              name="estimatedArrival"
              value={formValues.estimatedArrival}
            />
          </div>
        </form>
      </Dialog.Body>
      <Dialog.Footer>
        <button onClick={onClose}>Close</button>
        <button onClick={handleSave}>Save</button>
      </Dialog.Footer>
    </Dialog>
  );
}
