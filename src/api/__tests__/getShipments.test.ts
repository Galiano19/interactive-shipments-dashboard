import { getShipments } from "../getShipments";

describe("getShipments", () => {
  it("should fetch shipments mocked data", async () => {
    const shipments = await getShipments();
    expect(shipments.length).toBeGreaterThan(10);
  });
});
