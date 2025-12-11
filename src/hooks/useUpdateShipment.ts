import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShipment } from "../api/updateShipmentApi";
import type { Shipment } from "../types/Shipments";

export const useUpdateShipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateShipment,
    onSuccess: (updatedShipment: Shipment) => {
      queryClient.setQueryData(["shipments-list"], (oldData: Shipment[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(shipment => 
          shipment.id === updatedShipment.id ? updatedShipment : shipment
        );
      });
    },
  });
};