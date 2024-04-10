import React from "react";
import axios from "axios";
import styles from "../Content.module.css";
import Navbar from "../../Navbar/Navbar";

const GetMethodDetails = async ({ searchParams }) => {
  var stats = [];
  try {
    const data = await axios.get(
      `http://18.60.59.48:3000/portal/chain?chain=${searchParams.chain}`
    );
    const filteredData = data.data.data.filter(
      (el) => el.actionName === searchParams.action
    );

    const senderList = [];
    filteredData.forEach((el) => {
      if (!senderList.includes(el.sender)) {
        senderList.push(el.sender);
        el.count = 1;
      } else {
        el.count++;
      }
    });
    filteredData.sort((a, b) => b.count - a.count);
    stats = [...filteredData];
  } catch (error) {
    return error;
  }
  return (
    <>
      <Navbar />
      <main className={styles.content}>
        <div className={styles.data}>
          <div className={styles.desc}>
            <h1>
              Chain Name :{" "}
              <span className={styles.name}>{searchParams.chain}</span>
            </h1>
            <h1>
              Action :{" "}
              <span className={styles.name}>{searchParams.action}</span>
            </h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sender</th>
                <th>Time Stamp</th>
                <th>Action</th>
                <th className={styles.countDrop}>
                  <label htmlFor="count">Count </label>
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.map((ob, ind) => {
                if (ob.count)
                  return (
                    <tr key={ind}>
                      <td className={styles.splRow}>{ob.sender}</td>
                      <td>{new Date(ob.timestamp * 1000).toLocaleString()}</td>
                      <td className={styles.splRow}>{ob.actionName} </td>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        {ob.count}
                      </td>
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

export default GetMethodDetails;
