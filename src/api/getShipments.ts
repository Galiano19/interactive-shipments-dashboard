import { shipmentMocks } from "../mocks/shipments";
import type { Shipment } from "../types/Shipments";

export function getShipments(): Promise<Shipment[]> {
  return new Promise((resolve) => {
    resolve(shipmentMocks);
  });
}
