import React from 'react'
import Sign from '../../components/forms/Sign'
import styles from './Forms.module.scss'
 
const Register = ({myTheme}) => {
  return (
    <div className={styles["form-row"]} data-theme={myTheme}>
            <Sign />

    </div>
  ) 
}

export default Register
