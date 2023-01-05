import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FileUpload from './FileUpload'
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./add.module.scss";
import { categories } from './data.js';

const AddProduct = ({setOpenAdd}) => {

    const navigate = useNavigate();

    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [gasoline, setGasoline] = useState('');
    const [transmission, setTransmission] = useState('');
    const [distance, setDistance] = useState('');
    const [people, setPeople] = useState('');
    const [uploadingImageProduct, setUploadingImageProduct] = useState(false)
    const [images, setImages] = useState([])


const [category, setCategory] = useState(categories[0].value);

  
    const handleChange = e => {
        console.log(e.target.value);
        setCategory(e.target.value);
  };
  console.log(category)

  const handlerAddProduct = async (e) => {
    e.preventDefault();

    
    try {

        const {data} = await axios.post("/api/products/add", {
            name,
            slug,
            category,
            description,
            year,
            price,
            people,
            gasoline,
            transmission,
            distance,
            images, 
            sellerId: userInfo._id,
            seller: userInfo.name,
            sellerImage: userInfo.image
        });
        // console.log(category)
        console.log(data);
        alert("You have successfully added Product!");
        navigate('/seller/dashboard');
        setOpenAdd(false);


    } catch(error) {

        console.log("Error!");
        alert("Add failed, please try again!");
    }
}
   
    const updateImages = (newImages) => {
      setImages(newImages)
  }

  return (
    <div className={styles.passwords}>
      <div className={styles.container}>
        <div className={styles["close-form"]} onClick={() => setOpenAdd(false)}>X</div>
      <div className={styles.content}>

      <form onSubmit={handlerAddProduct}>
      <div className={styles["user-details"]}>

        <div className={styles["input-box"]}>
            <span className={styles.details}>Name</span>
            <input required type="text" id='name'  onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div className={styles["input-box"]}>
            <span className={styles.details}>Slug</span>
            <input required type="text" id='slug' onChange={(e) => setSlug(e.target.value)} value={slug} />
        </div>
        <div className={styles["input-box"]}>
            <span className={styles.details}>Category</span>
            <select onChange={handleChange} className="form-control" value={category}>
             
             {categories.map((c, i) => (
                <option key={i} value={c._id}> 
                  {c.name}
                 </option>
             ))}
       </select>
       </div>
       <div className={styles["input-box"]}>
            <span className={styles.details}>Year</span>
            <input required type="text" id='year' onChange={(e) => setYear(e.target.value)} value={year} />
        </div>
       <div className={styles["input-box"]}>
            <span className={styles.details}>Price</span>
            <input required type="text" id='price' onChange={(e) => setPrice(e.target.value)} value={price} />
        </div>
     
       <div className={styles["input-box"]}>
            <span className={styles.details}>Number of People</span>
            <input required type="text" id='people' onChange={(e) => setPeople(e.target.value)} value={people} />
        </div>
       <div className={styles["input-box"]}>
            <span className={styles.details}>Manual or Automatic</span>
            <input required type="text" id='transmission' onChange={(e) => setTransmission(e.target.value)} value={transmission} />
        </div>
       <div className={styles["input-box"]}>
            <span className={styles.details}>Distance Km/Hour</span>
            <input required type="text" id='distance' onChange={(e) => setDistance(e.target.value)} value={distance } />
        </div>
       <div className={styles["input-box"]}>
            <span className={styles.details}>Diesel or Petrol</span>
            <input required type="text" id='gasoline' onChange={(e) => setGasoline(e.target.value)} value={gasoline} />
        </div>
        
      <div className={styles["input-box"]}>
            <span className={styles.details}>Description</span>
            <textarea id='description' required onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        </div>
      </div>
      <div className={styles["image-box"]}>
      <span className={styles.details}>Images</span>
      <FileUpload refreshFunction={updateImages} />
      </div>
        <div className="form-btn">
            <button  className="btn" type='submit'><FontAwesomeIcon icon={faPlusCircle} />{uploadingImageProduct ? "Saving..." : "Save Product"}</button>
        </div>
      </form>
      
      </div>  
      </div>
    </div>
  )
}

export default AddProduct
