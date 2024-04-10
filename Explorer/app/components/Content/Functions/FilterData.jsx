function getTokenCounts(data) {
  const tokenCounts = {};

  data.forEach((entry) => {
    const {
      buyAmount,
      buyCurrencySym,
      sellAmount,
      sellCurrencySym,
      sellCurrency,
      buyCurrency,
    } = entry;

    if (!tokenCounts[buyCurrencySym]) {
      tokenCounts[buyCurrencySym] = {
        token: buyCurrencySym,
        buyAmount: 0,
        sellAmount: 0,
        currency: buyCurrency,
      };
    }

    if (!tokenCounts[sellCurrencySym]) {
      tokenCounts[sellCurrencySym] = {
        token: sellCurrencySym,
        buyAmount: 0,
        sellAmount: 0,
        currency: sellCurrency,
      };
    }

    tokenCounts[buyCurrencySym].buyAmount += buyAmount;
    tokenCounts[sellCurrencySym].sellAmount += sellAmount;
  });

  return Object.values(tokenCounts);
}

export default getTokenCounts;
