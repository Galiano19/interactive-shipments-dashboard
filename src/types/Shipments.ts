// Copied from the provided assigment
export interface Shipment {
  id: string; // e.g., 'SHP-001'
  origin: string; // e.g., 'Port of Shanghai'
  destination: string; // e.g., 'Port of Rotterdam'
  status: "Booked" | "In Transit" | "Delivered" | "Cancelled";
  estimatedArrival: string; // ISO 8601 Date string
}
