import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import useLocalStorage from "use-local-storage"; 
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import './App.scss';
import Order from './components/accuser/Order';
import UserInfoOrder from './components/accuser/UserInfoOrder';
import AdminDashboard from './pages/admin/Admin';
import Header from './components/header/Header'
// import Footer from './components/footer/Footer'
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import Account from './pages/account/Account';
import Cart from './pages/cart/Cart';
import Follow from './pages/follow/Follow';
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';
import Home from './pages/home/Home';
import Product from './pages/product/Product';
import Seller from './pages/seller/Seller';
import Sellers from './pages/sellers/Sellers';
import Shop from './pages/shop/Shop';

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [switchBtn, setSwitchBtn] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setSwitchBtn(!switchBtn);
  };

  useEffect(() => {
    if (theme === "dark") {
      setSwitchBtn(true);
    }
  }, [theme]);
  return (
    <>
    <Router>
    <Toaster
        position="buttom-right"
        toastOptions={{
          duration: 2000,
        }}
      />
        <Header myTheme={theme} onToggleTheme={toggleTheme} onSwitch={switchBtn} />
        <Routes>
          <Route path='/' element={<Home myTheme={theme}  />} />
          <Route path='/shop' element={<Shop myTheme={theme}  />} />
          <Route path='/:slug' element={<Product myTheme={theme}  />} />
          <Route path='/sellers' element={<Sellers myTheme={theme}  />} />
          <Route path='/seller/:id' element={<Seller myTheme={theme}  />} />
          <Route path='/login' element={<Login myTheme={theme}  />} />
          <Route path='/register' element={<Register myTheme={theme}  />} />
          <Route path='/follow' element={<Follow myTheme={theme}  />} />
          <Route path='/cart' element={<Cart myTheme={theme}  />} />
          <Route path='/admin/dashboard' element={
            <AdminRoute>
              <AdminDashboard myTheme={theme}  />
            </AdminRoute>
          } />
          <Route path='/seller/dashboard' element={
            <PrivateRoute>
              <Account myTheme={theme}  />
            </PrivateRoute>
          } />
          <Route path='/order/:id' element={<Order myTheme={theme}  />} />
          <Route path='/userorder/:id' element={<UserInfoOrder myTheme={theme}  />} />
        </Routes>

        {/* <Footer myTheme={theme} /> */}
      </Router>
    </>
  );
}

export default App;
