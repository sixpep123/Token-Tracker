"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Content.module.css";

const Content = () => {
  const [chainName, setChainName] = useState("wax");
  const [searchContract, setSearchContract] = useState("");
  const [countValue, setCountValue] = useState(new Date().getTime() / 1000);
  const [stats, setStats] = useState([]);
  const [presentTime, setPresentTime] = useState(
    Math.floor(new Date().getTime() / 1000)
  );

  useEffect(() => {
    const getData = async () => {
      try {
        let url = "http://18.60.59.48:3000/portal/";

        if (chainName) url += `filter/criteria?chain=${chainName}`;
        if (searchContract) {
          url += `&contractName=${searchContract}`;
        }

        const fetchData = await fetch(url);
        const jsonData = await fetchData.json();
        const details = jsonData.response;

        if (countValue) {
          const pastTimeData = details.filter(
            (data) => data.timestamp > presentTime - countValue
          );

          const counts = {};
          pastTimeData.forEach((ctr) => {
            const key = `${ctr.contractName}_${ctr.actionName}`;
            if (counts[key]) {
              counts[key]++;
            } else {
              counts[key] = 1;
            }
          });
          for (const key in counts) {
            if (counts.hasOwnProperty(key)) {
              const [contractName, method] = key.split("_");
              const count = counts[key];

              const objMatch = pastTimeData.find(
                (obj) =>
                  obj.contractName === contractName && obj.actionName === method
              );
              if (objMatch) {
                objMatch.count = count;
              }
            }
          }
          const finalCountedData = pastTimeData.filter((data) => data.count);
          finalCountedData.sort((a, b) => b.count - a.count);
          setStats(finalCountedData);
        }
      } catch (error) {
        return error;
      }
    };
    getData();
  }, [chainName, countValue, searchContract, presentTime]);

  return (
    <main className={styles.content}>
      <div className={styles.data}>
        <div className={styles.filter}>
          <div>
            <label htmlFor="chain">Chain : </label>
            <select
              name="chain"
              id=""
              onChange={(e) => {
                setChainName(`${e.target.value}`);
                setSearchContract("");
              }}
            >
              <option value="wax">Wax</option>
              <option value="ethereum">Ethereum</option>
              <option value="solana">Solana</option>
            </select>
          </div>
          <form action="" method="get">
            <label htmlFor="text">Contract : </label>
            <input
              type="text"
              placeholder="Search by Address"
              value={searchContract}
              onChange={(e) => setSearchContract(e.target.value)}
            />
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>Contract</th>
              <th>Chain</th>
              <th>Method</th>
              <th className={styles.countDrop}>
                <label htmlFor="count">Count In : </label>
                <select
                  name="count"
                  id=""
                  className=""
                  onChange={(e) => {
                    setCountValue(e.target.value);
                  }}
                >
                  <option value={presentTime}>All Time</option>
                  <option value={300}>Last 5 Minutes</option>
                  <option value={3600}>Last 1 Hour</option>
                  <option value={21600}>Last 6 Hours</option>
                  <option value={86400}>Last 1 Day</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map((item, index) => {
              if (item.count) {
                return (
                  <tr key={index}>
                    <td onClick={() => setSearchContract(item.contractName)}>
                      <a
                        className={styles.splRow}
                        href={
                          item.chain === "ethereum"
                            ? `https://etherscan.io/address/${item.contractName}`
                            : `https://wax.bloks.io/account/${item.contractName}`
                        }
                        target="_blank"
                      >
                        {item.contractName}
                      </a>
                    </td>
                    <td>{item.chain}</td>
                    <td>
                      <Link
                        className={styles.splRow}
                        href={{
                          pathname: "/components/Content/method",
                          query: {
                            chain: item.chain,
                            action: item.actionName,
                          },
                        }}
                      >
                        {item.actionName}
                      </Link>
                    </td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      {item.count}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Content;
