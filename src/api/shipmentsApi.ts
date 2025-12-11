import type { Shipment } from "../types/Shipments";

export const fetchShipments = async () => {
  const response = await fetch("/mocks/shipments.json");

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.details || `error fetching shipments`);
  }

  const data = (await response.json()) as Shipment[];
  return data;
};
