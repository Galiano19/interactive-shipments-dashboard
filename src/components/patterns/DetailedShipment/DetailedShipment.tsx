import { useState } from "react";
import { useUpdateShipment } from "../../../hooks/useUpdateShipment";
import type { Shipment, ShipmentStatus } from "../../../types/Shipments";
import Dialog from "../../ui/dialog/dialog";
import { shipmentStatus } from "../../../constants/shipmentStatus";

interface DetailedShipmentProps {
  shipment: Shipment;
  onClose: () => void;
}

export default function DetailedShipment({
  shipment,
  onClose,
}: DetailedShipmentProps) {
  const updateShipmentMutation = useUpdateShipment();
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
    const updatedShipment: Shipment = {
      ...shipment,
      ...formValues,
    };

    updateShipmentMutation.mutate(updatedShipment, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Dialog title={shipment.id} defaultOpen onClose={onClose}>
      <Dialog.Body>
        {updateShipmentMutation.isError && (
          <div className="error_message">
            Something went wrong, please try again
          </div>
        )}
        <form className="edit_form">
          <div className="edit_form_row">
            <label htmlFor="origin">Origin:</label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formValues.origin}
              disabled
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
              disabled={updateShipmentMutation.isPending}
            />
          </div>
          <div className="edit_form_row">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              onChange={handleStatusChange}
              disabled={updateShipmentMutation.isPending}
              value={formValues.status}
            >
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
              disabled
            />
          </div>
        </form>
      </Dialog.Body>
      <Dialog.Footer>
        <button onClick={onClose} disabled={updateShipmentMutation.isPending}>
          Close
        </button>
        <button
          onClick={handleSave}
          disabled={updateShipmentMutation.isPending}
        >
          Save
        </button>
      </Dialog.Footer>
    </Dialog>
  );
}
