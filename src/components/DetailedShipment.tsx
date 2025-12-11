import type { Shipment } from "../types/Shipments";
import Dialog from "./ui/dialog/dialog";

interface DetailedShipmentProps {
  shipment: Shipment;
  onClose: () => void;
}

export default function DetailedShipment({
  shipment,
  onClose,
}: DetailedShipmentProps) {
  return (
    <Dialog title={shipment.id} defaultOpen onClose={onClose}>
      <Dialog.Body>
        <p>Origin: {shipment.origin}</p>
        <p>Destination: {shipment.destination}</p>
        <p>Status: {shipment.status}</p>
        <p>Estimated Arrival: {shipment.estimatedArrival}</p>
      </Dialog.Body>
      <Dialog.Footer>
        <button onClick={onClose}>Close</button>
        <button>Save</button>
      </Dialog.Footer>
    </Dialog>
  );
}
