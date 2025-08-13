/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  KittyCore,
  KittyCore_Approval,
  KittyCore_Birth,
  KittyCore_ContractUpgrade,
  KittyCore_Pregnant,
  KittyCore_Transfer,
} from "generated";

KittyCore.Approval.handler(async ({ event, context }) => {
  const entity: KittyCore_Approval = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    approved: event.params.approved,
    tokenId: event.params.tokenId,
  };

  context.KittyCore_Approval.set(entity);
});

KittyCore.Birth.handler(async ({ event, context }) => {
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
});

KittyCore.ContractUpgrade.handler(async ({ event, context }) => {
  const entity: KittyCore_ContractUpgrade = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newContract: event.params.newContract,
  };

  context.KittyCore_ContractUpgrade.set(entity);
});

KittyCore.Pregnant.handler(async ({ event, context }) => {
  const entity: KittyCore_Pregnant = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    matronId: event.params.matronId,
    sireId: event.params.sireId,
    cooldownEndBlock: event.params.cooldownEndBlock,
  };

  context.KittyCore_Pregnant.set(entity);
});

KittyCore.Transfer.handler(async ({ event, context }) => {
  const entity: KittyCore_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    to: event.params.to,
    tokenId: event.params.tokenId,
  };

  context.KittyCore_Transfer.set(entity);
});
