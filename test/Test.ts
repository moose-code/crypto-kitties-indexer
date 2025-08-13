import assert from "assert";
import { 
  TestHelpers,
  KittyCore_Approval
} from "generated";
const { MockDb, KittyCore } = TestHelpers;

describe("KittyCore contract Approval event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for KittyCore contract Approval event
  const event = KittyCore.Approval.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("KittyCore_Approval is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await KittyCore.Approval.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualKittyCoreApproval = mockDbUpdated.entities.KittyCore_Approval.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedKittyCoreApproval: KittyCore_Approval = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      owner: event.params.owner,
      approved: event.params.approved,
      tokenId: event.params.tokenId,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualKittyCoreApproval, expectedKittyCoreApproval, "Actual KittyCoreApproval should be the same as the expectedKittyCoreApproval");
  });
});
