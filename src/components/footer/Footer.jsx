import React from 'react';
import styles from "./Footer.module.scss";
import { Link } from 'react-router-dom';
import {  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const date = new Date();
const year = date.getFullYear();

const Footer = ({ myTheme }) => {
  return (
    <footer className={styles["footer-section"]} data-theme={myTheme}>
       <div className={styles.subscribe}>
                <h4>get latest updates everyday</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, dolorem.</p>
              
            </div>
          <div className={styles["subscribe-area"]}>
          <div className={styles.container}>
           
            <footer className={styles["footer-area"]}>
               <div className={styles.footer}>
                  <div className={styles["single-footer"]}>
                  <h4>about us</h4>
                    <p>Centric aplications productize front end vortals visualize front end isite results and value added globally for simplify alternative systems without cross-platform models.</p>
                  </div>
                  <div className={styles["single-footer"]}>
                    <h4>quick links</h4>
                    <ul>
                    <li><a href=""><i className="fa-solid fa-caret-right"></i> home</a></li>
                    <li><a href=""><i className="fa-solid fa-caret-right"></i> Cars</a></li>
                    <li><a href=""><i className="fa-solid fa-caret-right"></i> sllers</a></li>
                    </ul>
                  </div>
                  <div className={styles["single-footer"]}>
                  <h4>contact us</h4>
                  <ul>
                    <li><a href=""><i class="fa-solid fa-location-dot"></i>DownTown Kigali</a></li>
                    <li><a href="tel:+250788959475"><i class="fa-solid fa-phone"></i> +250788959475</a></li>
                    <li><a href="milto:info@domainname.com"><i class="fa-solid fa-envelope"></i> info@domainname.com</a></li>
                  </ul>
                  </div>
                </div>

            </footer>
        </div>
        <section className={styles["footer-bottom-area"]}>
        <div className={styles.container}>
            <div className={styles["footer-bottom"]}>
                <div className= {styles.copy}>
                <p className={styles["footer-company-name"]}>&copy; {year} <strong>All Rights Reserved</strong></p>
                </div>
                <div className={styles["footer-menu"]}>
                    <a href="">Home</a>
                    <a href="">Cars</a>
                    <a href="">contact us</a>
                </div>
            </div>
        </div>
    </section>
          </div>
    </footer>
  )
}

export default Footer
