import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import ManageProducts from '../ManageProducts';
import ManageUsers from '../ManageUsers';
import ManagePendingProducts from '../ManagePendingProducts';

const Home = () => {

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className={styles.container}>
    <div className={styles["bloc-tabs"]}>
      
      <button
        className={toggleState === 1 ?` ${styles["tabs"]} ${styles["active-tabs"]} `: styles.tabs}
        onClick={() => toggleTab(1)}
      >
       Cars
      </button>
      <button
        className={toggleState === 2 ?` ${styles["tabs"]} ${styles["active-tabs"]} `: styles.tabs}
        onClick={() => toggleTab(2)}
      >
        Sellers
      </button>
      <button
        className={toggleState === 3 ?` ${styles["tabs"]} ${styles["active-tabs"]} `: styles.tabs}
        onClick={() => toggleTab(3)}
      >
        Pendings
      </button>
    </div>

    <div className={styles["content-tabs"]}>
      <div
        className={toggleState === 1 ?`${styles["content"]} ${styles["active-content"]}` : styles.content}
      >
        <ManageProducts />
      </div>

      <div
        className={toggleState === 2 ?`${styles["content"]} ${styles["active-content"]}` : styles.content}
      >
        <ManageUsers />
      </div>

      <div
        className={toggleState === 3 ?`${styles["content"]} ${styles["active-content"]}` : styles.content}
      >
               <ManagePendingProducts />

      </div>
      
    </div>
  </div>
  );
};

export default Home;
