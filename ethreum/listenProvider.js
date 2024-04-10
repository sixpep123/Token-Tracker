const ethers = require("ethers");
const {
  blockGap,
  SwapRouterVariables,
  ContractCallsQuery,
  ContractConfig,
  dexTradeTrxVariables,
  dexTradesQuery,
  headers,
  url,
} = require("./constants");
const {
  listenUniswap,
  listenDexTrades,
  dexFilter,
  postData,
} = require("./functions");

const provider = ethers.getDefaultProvider(
  "https://eth-mainnet.g.alchemy.com/v2/jqX2i1lT2xoPUfiCjTwqckHjq8_x_8AX"
);

const GetStats = () => {
  provider.on("block", async (blockNumber) => {
    try {
      SwapRouterVariables.height = blockNumber - blockGap;
      ContractCallsQuery.variables = SwapRouterVariables;
      const ContractCalls = await listenUniswap(url, ContractCallsQuery, {
        headers,
      });

      if (ContractCalls.length > 0) {
        let txs = [];
        for (let call of ContractCalls) {
          let trxHash = call.transaction.hash;
          if (!txs.includes(trxHash)) {
            txs.push(trxHash);
            dexTradeTrxVariables.hash = trxHash;
            dexTradesQuery.variables = dexTradeTrxVariables;
            ContractConfig.data = dexTradesQuery;
            let DexResult = await listenDexTrades(url, dexTradesQuery, {
              headers,
            });
            let CallMethod = call.smartContractMethod.name;
            if (DexResult.dexTrades.length > 0) {
              const result = dexFilter(
                DexResult.dexTrades,
                DexResult.transactions,
                trxHash,
                CallMethod
              );
              console.log(result);
              const postedResult = await postData(result);
              console.log(postedResult.data.message);
              console.log(".".repeat(100));
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

GetStats();
