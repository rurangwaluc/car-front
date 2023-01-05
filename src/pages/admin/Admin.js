import React from "react";
import AdminDashboard from "../../components/admin/home/Home";


import styles from "./Admin.module.scss";

const Admin = ({myTheme}) => {
  return (
    <div className={styles.admin} data-theme={myTheme}>

      <div className={styles.content}>
       <AdminDashboard />
      </div>
    </div>
  );
};
export default Admin;
