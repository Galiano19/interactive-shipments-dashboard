import type { Shipment } from "../types/Shipments";

export const updateShipment = async (
  updatedShipment: Shipment
): Promise<Shipment> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const succeed = Math.random() < 0.5;
  if (!succeed) {
    throw new Error("Failed to update the shipment");
  }

  return updatedShipment;
};
