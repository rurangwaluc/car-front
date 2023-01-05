import React from 'react'
import SellFilters from '../../components/sellfilters/SellFilters'
import styles from "./Sellers.module.scss";

const Sellers = ({ myTheme }) => {
  return (
    <div className={styles["sellers-wrapper"]} data-theme={myTheme}>

        <main className='main-container'>
          <SellFilters />
        </main>

    </div>
  )
}

export default Sellers
