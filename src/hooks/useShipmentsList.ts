import { useQuery } from "@tanstack/react-query";
import { fetchShipments } from "../api/shipmentsApi";

export const useShipmentsList = () => {
  return useQuery({
    //no need for a dinamic query key since data is mocked
    queryKey: ["shipments-list"],
    queryFn: fetchShipments,
    enabled: false,
    retry: false,
  });
};
