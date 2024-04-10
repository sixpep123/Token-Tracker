const { request, gql } = require("graphql-request");

const liquidityQuery = gql`
  query {
    pools(first: 10, orderBy: liquidity, orderDirection: desc) {
      id
    }
  }
`;

const query = gql`
  query {
    pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8") {
      tick
      token0 {
        symbol
        id
        decimals
      }
      token1 {
        symbol
        id
        decimals
      }
      feeTier
      sqrtPrice
      liquidity
    }
  }
`;

const aggrData = gql`
  query {
    poolDayDatas(
      first: 2
      orderBy: date
      where: {
        pool: "0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801"
        date_gt: 1633642435
      }
    ) {
      date
      liquidity
      sqrtPrice
      token0Price
      token1Price
      volumeToken0
      volumeToken1
    }
  }
`;

const poolCountQuery = gql`
  query {
    factory(id: "0x1F98431c8aD98523631AE4a59f267346ea31F984") {
      poolCount
      txCount
      totalVolumeUSD
      totalVolumeETH
    }
  }
`;

const endpoint =
  "https://gateway-arbitrum.network.thegraph.com/api/ed45e93c6a80a9156ab7565f2fb603aa/subgraphs/id/HUZDsRpEVP2AvzDCyzDHtdc64dyDxx8FQjzsmqSg4H3B";

request(endpoint, poolCountQuery).then((data) =>
  console.log("poolCountQuery", data)
);

request(endpoint, query).then((data) => console.log("query", data));

request(endpoint, liquidityQuery).then((data) =>
  console.log("liquidityQuery", data)
);

request(endpoint, aggrData).then((data) => console.log("aggrData", data));
