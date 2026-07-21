/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { indexer, KittyCore, KittyCore_Approval, KittyCore_Birth, KittyCore_ContractUpgrade, KittyCore_Pregnant, KittyCore_Transfer } from "envio";

indexer.onEvent(
  { contract: "KittyCore", event: "Approval" },
  async ({ event, context }) => {
  const entity: KittyCore_Approval = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    approved: event.params.approved,
    tokenId: event.params.tokenId,
  };

  context.KittyCore_Approval.set(entity);
}
);

indexer.onEvent(
  { contract: "KittyCore", event: "Birth" },
  async ({ event, context }) => {
  const entity: KittyCore_Birth = {
    id: event.params.kittyId.toString(),
    owner: event.params.owner,
    kittyId: event.params.kittyId,
    matronId: event.params.matronId,
    sireId: event.params.sireId,
    genes: event.params.genes,
    timestamp: BigInt(event.block.timestamp),
  };

  context.KittyCore_Birth.set(entity);
}
);

indexer.onEvent(
  { contract: "KittyCore", event: "ContractUpgrade" },
  async ({ event, context }) => {
  const entity: KittyCore_ContractUpgrade = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newContract: event.params.newContract,
  };

  context.KittyCore_ContractUpgrade.set(entity);
}
);

indexer.onEvent(
  { contract: "KittyCore", event: "Pregnant" },
  async ({ event, context }) => {
  const entity: KittyCore_Pregnant = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    matronId: event.params.matronId,
    sireId: event.params.sireId,
    cooldownEndBlock: event.params.cooldownEndBlock,
  };

  context.KittyCore_Pregnant.set(entity);
}
);

indexer.onEvent(
  { contract: "KittyCore", event: "Transfer" },
  async ({ event, context }) => {
  const entity: KittyCore_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    to: event.params.to,
    tokenId: event.params.tokenId,
  };

  context.KittyCore_Transfer.set(entity);
}
);
