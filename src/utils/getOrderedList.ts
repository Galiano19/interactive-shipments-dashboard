import type { Shipment, ShipmentsOrder } from "../types/Shipments";

export function getOrderedList({
  list,
  order,
  item,
}: {
  list: Shipment[];
  order: ShipmentsOrder;
  item: "status" | "date-arrival";
}) {
  let sortedList = list;
  let currentOrder = order;
  if (order === undefined || order === "desc") {
    if (item === "status") {
      sortedList = [...list].sort((a, b) => a.status.localeCompare(b.status));
    } else {
      sortedList = [...list].sort((a, b) =>
        a.estimatedArrival.localeCompare(b.estimatedArrival)
      );
    }
    currentOrder = "asc";
  } else {
    if (item === "status") {
      sortedList = [...list].sort((a, b) => b.status.localeCompare(a.status));
    } else {
      sortedList = [...list].sort((a, b) =>
        b.estimatedArrival.localeCompare(a.estimatedArrival)
      );
    }
    currentOrder = "desc";
  }

  return { sortedList, currentOrder };
}
