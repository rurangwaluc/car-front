import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import FillterProductInfo from './FillterProductInfo';
import styles from "./Filter.module.scss";

const FilterProduct = ({products}) => {


    const [pageNumber, setPageNumber] = useState(0);
    const sellersPerPage = 12;
    const pagesVisited = pageNumber * sellersPerPage;

    const pageCount = Math.ceil(products.length / sellersPerPage);

    const handlePageClick = ({selected}) => {
        setPageNumber(selected);
    } 

  return (
    <> 
        <ul className={styles["featured-car-list"]}>
            {products.slice(pagesVisited, pagesVisited + sellersPerPage).map((product) => (
                <FillterProductInfo key={product._id} product={product} />
            ))}
        </ul>
        <ReactPaginate className={styles['filter-pagination']} 
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            pageClassName={"pagi-item"}
            pageLinkClassName={"pagi-link"}
            activeClassName={"pagi-active"}
            activeLinkClassName={"pagi-active-link"}
            previousClassName={"pagi-item"}
            previousLinkClassName={"pagi-link"}
            nextClassName={"pagi-item"}
            nextLinkClassName={"pagi-link"}
            breakClassName={"pagi-item"}
            breakLinkClassName={"pagi-link"}
            disabledClassName={"disabledPagi"}
        />
    </>
  )
}

export default FilterProduct
