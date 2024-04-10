const axios = require("axios");

const listenUniswap = async (url, payload, headers) => {
  try {
    const res = await axios.post(url, payload, headers);
    return res.data.data.ethereum.smartContractCalls;
  } catch (error) {
    return error;
  }
};

const listenDexTrades = async (url, payload, headers) => {
  try {
    const dexData = await axios.post(url, payload, headers);
    return dexData.data.data.ethereum;
  } catch (error) {
    return error;
  }
};

const dexFilter = (trades, transactions, callTrx, method) => {
  let details = {};
  for (let i = 0; i < trades.length; i++) {
    details.chain = "ethereum";
    details.protocol = trades[i].protocol;
    details.blockNumber = trades[i].block.height;
    details.actionName = method;
    details.contractName = trades[i].smartContract.address.address;
    details.tx_hash = callTrx;
    details.timestamp =
      new Date(trades[i].block.timestamp.time).getTime() / 1000;
    details.buyAmount = trades[i].buyAmount;
    details.buyCurrency = trades[i].buyCurrency.address;
    details.buyCurrencySym = trades[i].buyCurrency.symbol;
    details.sellAmount = trades[i].sellAmount;
    details.sellCurrency = trades[i].sellCurrency.address;
    details.sellCurrencySym = trades[i].sellCurrency.symbol;
  }
  for (let trx of transactions) {
    details.sender = trx.sender.address;
    details.recipient = trx.to.address;
  }
  return details;
};

const postData = async (data) => {
  try {
    const resp = axios.post("http://18.60.59.48:3000/portal", data);
    return resp;
  } catch (error) {
    return error;
  }
};

module.exports = {
  listenUniswap,
  listenDexTrades,
  dexFilter,
  postData,
};
