import { BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  SmartFundAdded
} from "../generated/Contract/Contract"

import {
  Deposit,
  Withdraw,
  Trade
} from "../generated/templates/SmartFund/SmartFund"

import { SmartFund as SF } from "../generated/templates";

import { SmartFund, SmartFundDeposit, SmartFundTrade, SmartFundWithdraw} from "../generated/schema"

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleSmartFundAdded(event: SmartFundAdded): void {
  SF.create(event.params.smartFundAddress);
  
  let smartfund = new SmartFund(event.params.smartFundAddress.toHex());
  smartfund.owner = event.params.owner;
  smartfund.save();  
}

export function handleDeposit(event : Deposit): void {
  let smartFundDeposit = new SmartFundDeposit(event.transaction.hash.toHex());
  smartFundDeposit.smartFundAddress = event.transaction.to.toHex();
  smartFundDeposit.user = event.params.user;
  smartFundDeposit.amount = event.params.amount;
  smartFundDeposit.sharesReceived = event.params.sharesReceived;
  smartFundDeposit.totalShares = event.params.totalShares;
  smartFundDeposit.timestamp = event.block.timestamp;
  smartFundDeposit.save()
}

export function handleWithdraw(event : Withdraw): void {
  let smartFundWithdraw = new SmartFundWithdraw(event.transaction.hash.toHex());
  smartFundWithdraw.smartFundAddress = event.transaction.to.toHex();
  smartFundWithdraw.user = event.params.user;
  smartFundWithdraw.sharesRemoved = event.params.sharesRemoved;
  smartFundWithdraw.totalShares = event.params.totalShares;
  smartFundWithdraw.timestamp = event.block.timestamp;
  smartFundWithdraw.save()
}

export function handleTrade(event : Trade): void {
  let smartFundTrade = new SmartFundTrade(event.transaction.hash.toHex());
  smartFundTrade.smartFundAddress = event.transaction.to.toHex();
  smartFundTrade.source = event.params.src;
  smartFundTrade.sourceAmount = event.params.srcAmount;
  smartFundTrade.destination = event.params.dest;
  smartFundTrade.destinationAmount = event.params.destReceived;
  smartFundTrade.timestamp = event.block.timestamp;
  smartFundTrade.save()
}