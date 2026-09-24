import { describe, it, expect } from "vitest";
import { createTestIndexer, TestHelpers, type KittyCore_Approval, type KittyCore_Birth } from "envio";

const { Addresses } = TestHelpers;

describe("KittyCore Approval", () => {
  it("stores a KittyCore_Approval entity", async () => {
    const indexer = createTestIndexer();
    const params = { owner: Addresses.mockAddresses[0], approved: Addresses.mockAddresses[1], tokenId: 42n };
    const blockNumber = 4605167;

    await indexer.process({
      chains: { 1: { simulate: [{ contract: "KittyCore", event: "Approval", params, block: { number: blockNumber, timestamp: 1511417055 }, logIndex: 0 }] } },
    });

    const id = `1_${blockNumber}_0`;
    const expected: KittyCore_Approval = { id, owner: params.owner, approved: params.approved, tokenId: params.tokenId };
    expect(await indexer.KittyCore_Approval.getOrThrow(id)).toEqual(expected);
  });
});

describe("KittyCore Birth", () => {
  it("stores a KittyCore_Birth entity keyed by kittyId with the block timestamp", async () => {
    const indexer = createTestIndexer();
    const params = { owner: Addresses.mockAddresses[0], kittyId: 7n, matronId: 1n, sireId: 2n, genes: 123456789n };

    await indexer.process({
      chains: { 1: { simulate: [{ contract: "KittyCore", event: "Birth", params, block: { number: 4605200, timestamp: 1511417999 }, logIndex: 3 }] } },
    });

    const expected: KittyCore_Birth = { id: "7", ...params, timestamp: 1511417999n };
    expect(await indexer.KittyCore_Birth.getOrThrow("7")).toEqual(expected);
  });
});
