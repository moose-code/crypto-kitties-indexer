import { describe, it, expect } from "vitest";
import { createTestIndexer, TestHelpers, type KittyCore_Approval } from "envio";

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
