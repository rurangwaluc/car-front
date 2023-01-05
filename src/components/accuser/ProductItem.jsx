import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EditProduct from './EditProduct'
import styles from "./Accuser.module.scss";

const ProductItem = ({pro}) => {
 
    const id = pro._id;

    
    const [openEdit, setOpenEdit] = useState(false);

    const handlerDeleteProduct = async (e) => {
        e.preventDefault();

        try {

            const {data} = await axios.delete(`/api/products/delete/${id}`);
            
            if(data) {
                alert("Product deleted successfully!");
            }

            

        } catch(err) {
            alert("Product not deleted!");
        }

    }

  return (
    <>
        <div className={styles["featured-car-card"]} key={pro._id}>
         <figure className={styles["card-banner"]}>
             <Link to={`../${pro.slug}`}>
                  <img src={`../${pro.images[0]}`} alt={pro.name} className={styles["w-100"]}/>
               </Link>
          </figure>
         <div className={styles.category}>
             <span >{pro.category}</span>
            </div>
          <div className={styles["card-content"]}>
            <div className={styles["card-title-wrapper"]}>
              <h3 className={`${styles["h3"]} ${styles["card-title"]}`}>
                <Link to={`${pro.slug}`}>{pro.name}</Link>                                    </h3>
              <data className={styles.year} value="2021">2021</data>
             </div>
             <ul className={styles["card-list"]}>

                <li className={styles["card-list-item"]}>
                <ion-icon name="people-outline"></ion-icon>

                 <span className={styles["card-item-text"]}>4 People</span>
                 </li>

                 <li className={styles["card-list-item"]}>
                 <ion-icon name="flash-outline"></ion-icon>

                 <span className={styles["card-item-text"]}>Hybrid</span>
                 </li>

                 <li className={styles["card-list-item"]}>
                 <ion-icon name="speedometer-outline"></ion-icon>

                 <span className={styles["card-item-text"]}>6.1km / 1-litre</span>
                 </li>

                 <li className={styles["card-list-item"]}>
                 <ion-icon name="hardware-chip-outline"></ion-icon>

                 <span className={styles["card-item-text"]}>Automatic</span>
                 </li>

             </ul>
             <div className={styles["card-price-wrapper"]}>
             <p className={styles["card-price"]}><strong>${(pro.price).toFixed(2)}</strong></p>
             </div>
         </div>

            <div className={`${styles["card-footer"]} ${styles["account"]}`}>
                <button className="btn" onClick={() => setOpenEdit(true)}><FontAwesomeIcon icon={faPencil} /> Edit</button>
                <button className="btn-red" onClick={(handlerDeleteProduct)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
            </div>
        </div>
        {openEdit && <EditProduct pro={pro} setOpenEdit={setOpenEdit} />}
    </>
  )
}

export default ProductItem
