import { BeamRequestBaseModel, sendRequest } from "../shared/helpers/axios";
import { BeamWalletStatusResponse } from "../interfaces";

export const getChainId = () => {
  return "0x582"; //hardcoded in POC
};

export const getNetVersion = () => {
  return getChainId();
};

export const getBlockNumber = async () => {
  const res = await sendRequest<BeamRequestBaseModel, BeamWalletStatusResponse>({
    jsonrpc: "2.0",
    id: 6,
    method: "wallet_status",
  });

  return res.current_height.toString(16);
};
