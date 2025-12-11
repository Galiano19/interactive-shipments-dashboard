export type ShipmentStatus =
  | "Booked"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

export type ShipmentsOrder = "asc" | "desc" | undefined;

// Copied from the provided assigment
export interface Shipment {
  id: string; // e.g., 'SHP-001'
  origin: string; // e.g., 'Port of Shanghai'
  destination: string; // e.g., 'Port of Rotterdam'
  status: ShipmentStatus;
  estimatedArrival: string; // ISO 8601 Date string
}
