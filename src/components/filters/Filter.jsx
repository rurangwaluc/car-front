import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FilterProduct from './FilterProduct'
import styles from "./Filter.module.scss";

const Filter = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState(""); 

    useEffect(() => {

        const fetchData = async () => {

            const result = await axios.get("/api/products");
            console.log(result.data);
            setProducts(result.data);

            const res = await axios.get("/api/category/list");
            console.log(res.data);
            setCategories(res.data);
        }

        fetchData();

    }, []);

    const filterResult = (catItem) => {
        const catResult = products.filter((curCat) => {
            return curCat.category === catItem;
        });
        setProducts(catResult);
    }

    //search
    const keys = ["name", "seller"];

    const search = () => {
        return products.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query)));
    };

    const handleReset = async (e) => {
        e.preventDefault();
        const result = await axios.get("/api/products");
        console.log(result.data);
        setProducts(result.data);
    }
  const allCategories = [  ...new Set(products.map((product) => product.category)),  ];
console.log(categories)
  return (
    <div className={styles['filter-row']}>
        
        {products.length === 0 ? (<h3 className='info'>There are currently no products!</h3>) : (

            <>
            
            <div className={styles["filter-col"]}>
                <div className={styles["filter-group"]}>
                    <button onClick={handleReset}>All</button>
                    {allCategories.map((cat,index) => (
                        <button key={index} onClick={() => filterResult(cat) }>{cat}</button>
                    ))}
                </div>
                <div className={styles["filter-group"]}>
                    <input type="search" placeholder='Search...' onChange={(e) => setQuery(e.target.value)} />
                </div>
            </div>
            <div className={styles["filter-shop"]}>
                <FilterProduct products={search(FilterProduct)} />
            </div>
            
            </>

        )}
    </div>
  )
}

export default Filter
