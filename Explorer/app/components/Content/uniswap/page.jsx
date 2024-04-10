import React from "react";
import styles from "./uniswap.module.css";
import GetData from "../Functions/GetData";
import getTokenCounts from "../Functions/FilterData";
import UniNavbar from "../../UniSwapNav/UniNav";

const Content = async () => {
  const ethData = await GetData();
  const ignoreList = ["WETH", "USDT", "USDC", "USDe", "DAI"];
  const filteredData = ethData.filter(
    (eth) =>
      !(
        ignoreList.includes(eth.sellCurrencySym) &&
        ignoreList.includes(eth.buyCurrencySym)
      )
  );
  const tokenCounts = getTokenCounts(filteredData);

  tokenCounts.sort(
    (a, b) => b.buyAmount + b.sellAmount - (a.buyAmount + a.sellAmount)
  );

  return (
    <>
      <UniNavbar />
      <main className={styles.content}>
        <div className={styles.data}>
          <table className={styles.dataTable}>
            <thead className={styles.thead}>
              <tr className={styles.trHead}>
                <th>Buy Token </th>
                <th>Buy Volume</th>
                <th>Sell Volume</th>
                <th>Total Volume</th>
              </tr>
            </thead>
            <tbody>
              {tokenCounts.map((obj) => {
                return (
                  <tr className={styles.trBody}>
                    <td>
                      <a
                        target="_blank"
                        href={`https://etherscan.io/token/${obj.currency}`}
                        className={styles.splRow}
                      >
                        {obj.token}
                      </a>
                    </td>
                    <td>{obj.buyAmount} </td>
                    <td>{obj.sellAmount} </td>
                    <td>{obj.buyAmount + obj.sellAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Content;
