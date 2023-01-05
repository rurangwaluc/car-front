import React from 'react'
import SignIn from '../../components/forms/SignIn'
import styles from './Forms.module.scss'

const Login = ({myTheme}) => {
  return (
      <div className={styles["form-row"]} data-theme={myTheme}>

          <SignIn />

    </div>
  )
}

export default Login