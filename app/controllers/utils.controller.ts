import { ParameterizedContext } from "koa";

import { MetaMaskMethodList } from "../shared/constants";
import { getBlockNumber, getChainId, getNetVersion } from "./metamask.controller";

export const getAliveHandler = async (ctx: ParameterizedContext) => {
  const uptime_minutes = process.uptime() / 60;
  const current_date = new Date().toISOString();
  const start_date = new Date(Date.now() - process.uptime() * 1000).toISOString();
  ctx.ok({
    uptime_minutes,
    current_date,
    start_date,
  });
};

export const metaMaskRoutingHandler = async (ctx: ParameterizedContext) => {
  const { id, jsonrpc, method, params } = ctx.request.body;

  // return id as response identifyer

  let result;

  switch (method) {
    case MetaMaskMethodList.EthChainD: // Returns the current network ID.
      result = getChainId();
      break;
    case MetaMaskMethodList.NetVersion: // The net_version endpoint in MetaMask is used to retrieve the network ID of the current Ethereum network the user is connected to.
      result = getNetVersion();
      break;

    case MetaMaskMethodList.EthBlockNumber: // The eth_blockNumber endpoint in Ethereum JSON-RPC API is used to retrieve the current block number of the Ethereum network the client is connected to.
      result = await getBlockNumber();
      break;

    case MetaMaskMethodList.EthGasPrice: // Returns the current gas price.
      break;

    case MetaMaskMethodList.EthEstimateGas: // endpoint in the Ethereum JSON-RPC API is used to estimate the gas required to perform a certain operation on the Ethereum network.
      break;

    case MetaMaskMethodList.EthGetCode: //  is used to retrieve the bytecode of a smart contract deployed on the Ethereum network.
      break;

    case MetaMaskMethodList.EthGetBalance: // Returns the balance of a given Ethereum address.
      break;

    case MetaMaskMethodList.EthGetTransactionCount: // Returns the number of transactions made by a given Ethereum address.
      break;

    case MetaMaskMethodList.EthSendRawTransaction: //  Accepts a signed Ethereum transaction and broadcasts it to the network.
      break;

    case MetaMaskMethodList.EthGetTransactionReceipt: // Returns the receipt of a given transaction.
      break;

    case MetaMaskMethodList.EthGetBlockByNumber: //Returns the block with a given block number.
      break;

    case MetaMaskMethodList.EthCall: //used to call (invoke) a specific function of a smart contract deployed on the Ethereum network, without actually modifying the state of the blockchain. This is useful for retrieving information from a smart contract, such as its current balance o
      break;
    default:
      result = null;
      break;
  }

  ctx.ok({
    id,
    jsonrpc,
    result,
  });
};
