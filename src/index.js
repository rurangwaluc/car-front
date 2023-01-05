import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StoreProvider } from './Store';
import "react-toastify/dist/ReactToastify.css";
// import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


    <StoreProvider >
       <App />
    </StoreProvider>

  </React.StrictMode>
);
