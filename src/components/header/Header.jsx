import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone,  } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import {  FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import styles from "./Header.module.scss";
import { isAuthenticated } from "../auth";
import { toast } from "react-hot-toast";
 

const logo = (
    <div className={styles.logo}>
      <Link to="/">
        {/* <img src={Logo} alt="Logo" /> */}
        <h2>Logo</h2>
      </Link>
    </div>
  );

  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  
const Header = ({ myTheme, onToggleTheme }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [scrollPage, setScrollPage] = useState(false);

    const navigate = useNavigate();

    const fixNavbar = () => {
        if (window.scrollY > 50) {
          setScrollPage(true);
        } else {
          setScrollPage(false);
        }
      };
      window.addEventListener("scroll", fixNavbar);

    const userInfo = isAuthenticated();

    const { state, dispatch:ctxDispatch } = useContext(Store);
    const {cart, wish} = state;
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
      };
    
      const hideMenu = () => {
        setShowMenu(false);
      };
    const signouthandler = () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("cartItems");
        toast.success("You have successfully logged out!");
        navigate("/login");
    }


  return (
    <>
    <header className={scrollPage ? `${styles.fixed}` : null}  data-theme={myTheme}>
        <div className={styles.headerTop}>
           <div className={styles.info}>
           <span><FontAwesomeIcon className={styles.rmIcon} icon={faPhone}/> +250788959475</span>
            <span><FontAwesomeIcon className={styles.rmIcon} icon={faEnvelope}/> rurangwa@gmail.com</span>
           </div>
            <div className={styles["toggle-btn" ]}onClick={onToggleTheme}>
              {myTheme === "dark" ? (
                  <BsSun color="yellow" size={18} />
                ) : (
                  <BsMoon className="dark" size={18} />
                )}
            </div>
           
        </div>
        <div className={styles.header}>
             {logo}
            <nav className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }>
                 <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>
             <ul className={styles.stroke} onClick={hideMenu}>
             <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} className={styles.colorX} onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={activeLink}>
                Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/sellers" className={activeLink}>
                Sellers
                </NavLink>
              </li>

             </ul>
            
             <div className={styles['header-right']} onClick={hideMenu}>
             <span className={styles.links}>
              
             {isAuthenticated() && userInfo.role === 0 && (
              <>            
             <Link to="/seller/dashboard">Account</Link>
             <Link to="/follow" >Follows{wish.wishItems.length ? (<span className={styles['header-badge']}>{wish.wishItems.length}</span>) : (<span className={styles['header-badge']}>0</span>)}</Link>
             <Link to="/cart" >Cart{cart.cartItems.length ? (<span className={styles['header-badge']}>{cart.cartItems.length}</span>) : (<span className={styles['header-badge']}>0</span>)}</Link>
             </>
             )}
             {isAuthenticated() && userInfo.role === 1 && (
              <>
              <Link to="/admin/dashboard">Account</Link>
              <Link to="/follow" >Follows{wish.wishItems.length ? (<span className={styles['header-badge']}>{wish.wishItems.length}</span>) : (<span className={styles['header-badge']}>0</span>)}</Link>
              <Link to="/cart" >Cart{cart.cartItems.length ? (<span className={styles['header-badge']}>{cart.cartItems.length}</span>) : (<span className={styles['header-badge']}>0</span>)}</Link>
              </>
              
              )}
              
                
                {
                    userInfo ? (<span className={styles.logout} onClick={signouthandler}>Logout</span>) : (<Link to="/login" className={styles.logout}>Login</Link>)
                }
              </span>
            </div>
            
        </nav>
        <div className={styles["menu-icon"]}>
            <HiOutlineMenuAlt3 size={28}  onClick={toggleMenu} />
          </div>
        </div>
    </header>
</>
  )
}

export default Header
