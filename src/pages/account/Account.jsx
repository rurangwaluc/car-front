import React from 'react'
import AccountUser from '../../components/accuser/AccountUser';
import styles from "./Account.module.scss";

const Account = ({ myTheme }) => {
  return (
    <div className={styles.account} data-theme={myTheme}>

        <main className='main-container'>
          <AccountUser />
        </main>
       
    </div>
  )
}

export default Account
