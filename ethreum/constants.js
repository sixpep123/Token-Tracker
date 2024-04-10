const url = "https://explorer.bitquery.io/proxy_graphql";

let ContractConfig = {
  method: "post",
  maxBodyLength: Infinity,
  // url: "https://graphql.bitquery.io",
  url: "https://explorer.bitquery.io/proxy_graphql",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "BQYzGjeOMwAzbxzMrhGhkNjobOAFNw1F",
    Authorization:
      "Bearer ory_at_CnAb_ZRmOOb4wu7u8Up7LXj8Ld0B9e3aRbSH7pNDPhk.jFyYZ3gaGCGA-2NrgZwFs0DKOSB0qJ2Bswn2Rc8RQtM",
  },
};

let ContractCallsQuery = {
  query: `query ($network: EthereumNetwork!, $height: Int!, $address: String!) {
  ethereum(network: $network) {
    smartContractCalls(caller: {is: $address}, height: {is: $height}) {
      block {
        timestamp {
          time(format: "%Y-%m-%d %H:%M:%S")
        }
        height
      }
      smartContractMethod {
        name
        signatureHash
      }
      smartContract {
        address {
          address
          annotation
        }
      }
      transaction {
        hash
      }
      external
      gasValue
      gas_value_usd: gasValue(in: USD)
    }
  }
}`,
};

const dexTradesQuery = {
  query: `query ($network: EthereumNetwork!, $hash: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
  ethereum(network: $network) {
    transactions(txHash: {is: $hash}) {
      amount
      amount_usd: amount(in: USD)
      currency {
        symbol
      }
      creates {
        address
        annotation
      }
      error
      success
      sender {
        address
        annotation
      }
      to {
        address
        annotation
      }
      gas
      gasPrice
      gasCurrency {
        symbol
      }
      gasValue
      gas_value_usd: gasValue(in: USD)
    }
    dexTrades(
      options: {desc: ["block.height", "tradeIndex"], limit: $limit, offset: $offset}
      date: {since: $from, till: $till}
      txHash: {is: $hash}
    ) {
      block {
        timestamp {
          time(format: "%Y-%m-%d %H:%M:%S")
        }
        height
      }
      tradeIndex
      protocol
      exchange {
        fullName
      }
      smartContract {
        address {
          address
          annotation
        }
      }
      buyAmount
      buy_amount_usd: buyAmount(in: USD)
      buyCurrency {
        address
        symbol
      }
      sellAmount
      sell_amount_usd: sellAmount(in: USD)
      sellCurrency {
        address
        symbol
      }
    }
  }
}
`,
};

let SwapRouterVariables = {
  network: "ethereum",
  address: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  height: 0,
  dateFormat: "%Y-%m-%d",
};

const dexTradeTrxVariables = {
  hash: "",
  limit: 10,
  network: "ethereum",
  offset: 0,
};

let blockGap = 20;

const headers = {
  "X-Csrf-Token":
    "2azF7qzej6TENOkF-tuyzS_AYPWDEEMR_viDoOOENl0pDgZm6txpgIiqVN7C4p3hS9jV7rOdmyugu1mcbkNyTg",
  Cookie:
    "_gid=GA1.2.1292807081.1711612316; _gcl_au=1.1.1536561298.1711612317; hubspotutk=613d67580054546032389aca8b1bba20; __hssrc=1; __hstc=113820952.613d67580054546032389aca8b1bba20.1711612319499.1711612319499.1711619185659.2; _app_session_key=6cf9936abf98b4a8306f4cf6d83b8684; _clck=d55vhf%7C2%7Cfkg%7C0%7C1548; _ga_J5F4SQLVDZ=GS1.1.1711619221.1.1.1711619225.0.0.0; _clsk=12jrx38%7C1711619287885%7C3%7C1%7Cd.clarity.ms%2Fcollect; _ga=GA1.1.2098203161.1711612316; __hssc=113820952.8.1711619185659; _explorer_session=v1EzHcizVFFM14hw3RJlmBwi3NTjZqzUkmdvGUUnzrZtU%2FZlcifzvFs7s%2B2l0QQvsMs6CRmG5gNFDvBVk6hMYyhkH7xNxQfzcmFZsrV1OmEP5SYeMkJ4uwRaP0hKX%2BMM3Pxgq4JxFD4Y%2BeNi7X1H7sKuAyOtqqGB7pR%2Bgge8VfN%2F%2F4jyA6CGyhyU41DI93Zx1vL7RdISaFItmBsRAfF0rsZH4dqEkvIz9WPUuLgh05gpdT35e%2BECjMQ4tyAUKNi4OdCwYCD0qybYyybPzyblFybsj3kGMH2RpnN9yMs%2BsqXMGFHnId4d3Vxp34p0KSeijyt9OPAxrMAKz%2FYfqR28gFlLlbCbspbl5s0%2BZv5dNVDfICJl5GdPVRrRWcpa%2FF4HuvWATkSM53x5EC6oCCLvAZ%2FeRKV%2B6XjT8lgXteoEZDNG9KJpptpvzyvTKTZl%2B97%2FqqNPGwtDvwA7DQoP8PaGae%2BS4qvI7bZYp22GqbilMh5yJhjRfjPM7f%2F%2Bk91LdaeB1wtydKEgPJcUT0u3cLSD7bVSw3gIqKdjvqC%2Fn%2BEx2Di9hF65bWAdTv1CD6cCeWEggmHxTJnXhnCGCJ%2B8KGgMp%2B4Tu0sZnjZJ5c7WeprncH%2BacULNPtuQA8muKY%2BNobqUOCuPwy578iLZFLOrhQ%3D%3D--%2BLRzg3inMd4a48WI--HCjyFspSeLUJQ693cmO9ww%3D%3D; _ga_VDQ8M1L5CS=GS1.1.1711619183.2.1.1711621622.0.0.0",
};

module.exports = {
  ContractCallsQuery,
  ContractConfig,
  SwapRouterVariables,
  blockGap,
  dexTradesQuery,
  dexTradeTrxVariables,
  url,
  headers,
};
