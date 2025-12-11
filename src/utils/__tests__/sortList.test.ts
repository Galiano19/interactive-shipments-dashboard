import type { Shipment } from "../../types/Shipments";
import { getOrderedList } from "../getOrderedList";

const mockShipments: Shipment[] = [
  {
    id: "1",
    origin: "anOrigin-1",
    destination: "aDestination-1",
    status: "Delivered",
    estimatedArrival: "2025-01-03T12:00:00Z",
  },
  {
    id: "2",
    origin: "anOrigin-2",
    destination: "aDestination-2",
    status: "Booked",
    estimatedArrival: "2025-01-01T12:00:00Z",
  },
  {
    id: "3",
    origin: "anOrigin-3",
    destination: "aDestination-3",
    status: "In Transit",
    estimatedArrival: "2025-01-02T12:00:00Z",
  },
];

describe("getOrderedList", () => {
  it("sorts by status ascending", () => {
    const { sortedList, currentOrder } = getOrderedList({
      list: mockShipments,
      order: "desc",
      item: "status",
    });
    expect(sortedList.map((s) => s.status)).toEqual([
      "Booked",
      "Delivered",
      "In Transit",
    ]);
    expect(currentOrder).toBe("asc");
  });

  it("sorts by status descending", () => {
    const { sortedList, currentOrder } = getOrderedList({
      list: mockShipments,
      order: "asc",
      item: "status",
    });
    expect(sortedList.map((s) => s.status)).toEqual([
      "In Transit",
      "Delivered",
      "Booked",
    ]);
    expect(currentOrder).toBe("desc");
  });

  it("sorts by estimatedArrival ascending", () => {
    const { sortedList, currentOrder } = getOrderedList({
      list: mockShipments,
      order: "desc",
      item: "date-arrival",
    });
    expect(sortedList.map((s) => s.estimatedArrival)).toEqual([
      "2025-01-01T12:00:00Z",
      "2025-01-02T12:00:00Z",
      "2025-01-03T12:00:00Z",
    ]);
    expect(currentOrder).toBe("asc");
  });

  it("sorts by estimatedArrival descending", () => {
    const { sortedList, currentOrder } = getOrderedList({
      list: mockShipments,
      order: "asc",
      item: "date-arrival",
    });
    expect(sortedList.map((s) => s.estimatedArrival)).toEqual([
      "2025-01-03T12:00:00Z",
      "2025-01-02T12:00:00Z",
      "2025-01-01T12:00:00Z",
    ]);
    expect(currentOrder).toBe("desc");
  });
});
