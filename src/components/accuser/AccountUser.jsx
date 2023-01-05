import { faPlusCircle, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Passwords from '../forms/Passwords'
import UserProduct from './UserProduct'
import AddProduct from './AddProduct'
import Orders from './Orders'
import AccountUserInfo from './AccountUserInfo';
import styles from "./Accuser.module.scss";

const AccountUser = () => {

    const navigate = useNavigate();

    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

    const id = userInfo && userInfo._id;

    const [name, setName] = useState(userInfo && userInfo.name);
    const [email, setEmail] = useState(userInfo && userInfo.email);
    const [address, setAddress] = useState(userInfo && userInfo.address);
    const [phone, setPhone] = useState(userInfo && userInfo.phone);

    const [image, setImage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false)
    const [previewImage, setPreviewImage] = useState(false)

    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    const [product, setProduct] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(!localStorage.getItem("userInfo")) {
            localStorage.getItem("userInfo");
            navigate('/');
        }

        const fetchData = async () => {
            try {
              const res = await axios.get(`/api/products/seller/${id}`);
              console.log(res.data);
              setProduct(res.data)

              const result = await axios.get(`/api/orders/mine/${id}`);
              console.log(result.data);
              setOrders(result.data)
      
            } catch(err) {
              console.log("Error!");
            }
        }
        fetchData();
    }, [navigate, id])

    const handlerUpdate = async (e) => {
        e.preventDefault();

        try {

            const {data} = await axios.put("/api/users/update", {
                _id: userInfo._id,
                name,
                email,
                address,
                phone
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            alert("User updated successfully!");

        } catch(err) {
            alert("Account not updated!");
        }
    }

    const validateImage = async (e) => {
        const file = e.target.files[0];
        if(file.size >= 1048576) {
            return alert("Max Size for Image is 1MB");
        } else {

            setImage(file);
            setPreviewImage(URL.createObjectURL(file));

        }
    }

    const uploadImage = async () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "wtdscvtg");
        try {

            setUploadingImage(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/db7jv57dm/image/upload", {

                method: "post",
                body: data

            });
            const urlData = await res.json();
            setUploadingImage(false);
            return urlData.url;

        } catch(error) {

            setUploadingImage(false);
            console.log(error);

        }
    }

    const handlerUpdateImage = async (e) => {
        e.preventDefault();

        if(!image) {
            return alert("Please select your Profile Image");
        }

        const url = await uploadImage(image); 
        console.log(url);

        const {data} = await axios.put("/api/users/update", {
            _id: userInfo._id,
            image: url
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        alert("Profile Image updated successfully!");
        
    }

  return (
    <div className={styles['account-row']}>
      <h2 className={styles["account-title"]}>My Account</h2>
      <div className={styles["account-groups"]}>
          <div className={styles["account-group"]}>
            <form className={styles['form-image']} onSubmit={handlerUpdateImage}>
                <img className={styles.file} src={previewImage || userInfo && userInfo.image} alt="" />
                <label htmlFor="image_upload">
                    <FontAwesomeIcon className={styles.icon} icon={faPlusCircle} />
                </label>
                <input type="file" hidden id='image_upload' accept='image/png, image/jpeg' onChange={validateImage}/>
                <button className={styles['btn-upload']}>{uploadingImage ? "Uploading..." : "Upload"}</button>
            </form>
               
              <div className={`${styles["form-row"]} ${styles["faccount"]}`}>
                <form onSubmit={handlerUpdate}>
                    <div className={styles["form-group"]}>
                        <label htmlFor="name">Full Name</label>
                        <input required type="text" onChange={(e) => setName(e.target.value)} value={name} id='name' />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Email</label>
                        <input required type="email" onChange={(e) => setEmail(e.target.value)} value={email} id='email' />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="address">Address</label>
                        <input required type="text" onChange={(e) => setAddress(e.target.value)} value={address} id='address' />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="phone">Phone</label>
                        <input required type="text" id='phone' onChange={(e) => setPhone(e.target.value)} value={phone} />
                    </div>
                    <div className={styles["form-group"]}>
                        <span className={styles["change-password"]} onClick={() => setOpen(true)}>Change Password</span>
                    </div>
                    <div className={styles["form-btn"]}>
                        <button className="btn"><FontAwesomeIcon icon={faRefresh} /> Update</button>
                    </div>
                </form>
              </div>
              {open && <Passwords setOpen={setOpen} />}
              {/* <div className={styles["account-info"]}>
                <AccountUserInfo />
              </div> */}
          </div>
          <div className={styles["account-group"]}>
              <h2 className={styles["account-subtitle"]}>My Products</h2>
              <button className='btn' onClick={() => setOpenAdd(true)}>Add Product</button>
              <div className={styles["account-products"]}>
                {product.length === 0 ? (<h3 className='info'>You have not added any products!</h3>) : (<UserProduct product={product} />)}
              </div>
              <h2 className="account-subtitle">My Orders</h2>
              <div className="account-orders">
                {orders.length === 0 ? (<h3 className='info'>You currently have no orders!</h3>) : (<Orders orders={orders} />)}
              </div>
            
            {openAdd && <AddProduct setOpenAdd={setOpenAdd} />}
          </div>
      </div>
    </div>
  )
}

export default AccountUser
