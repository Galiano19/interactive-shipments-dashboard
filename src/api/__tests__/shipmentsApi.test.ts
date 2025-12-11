import type { Shipment } from "../../types/Shipments";
import { fetchShipments } from "../shipmentsApi";

describe("fetchShipments", () => {
  const mockData: Shipment[] = [
    {
      id: "SHP-001",
      origin: "Port of Shanghai",
      destination: "Port of Rotterdam",
      status: "Booked",
      estimatedArrival: "2025-01-01T12:00:00Z",
    },
    {
      id: "SHP-002",
      origin: "Port of Hamburg",
      destination: "Port of New York",
      status: "In Transit",
      estimatedArrival: "2025-01-03T12:00:00Z",
    },
  ];

  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches the mocked data json when function is called", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchShipments();

    expect(result);
    expect(fetch).toHaveBeenCalledWith("/mocks/shipments.json");
  });

  it("returns shipment data when fetch is successful", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchShipments();

    expect(result).toEqual(mockData);
  });

  it("throws a generic error when fetch returns !ok and json fails", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error("JSON parse error");
      },
    });

    await expect(fetchShipments()).rejects.toThrow("error fetching shipments");
  });
});
