import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../Store'
import styles from "./Follcustomer.module.scss";

const FollCustomerInfo = ({item}) => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
    const { wish } = state;

  const handlerUnfollow = (item) => {

    ctxDispatch({
      type: 'WISH_REMOVE_ITEM',
      payload: item,
  });

}

  return (
    <>
    <div className={styles.box} key={item._id}>
       <Link to={`../seller/${item._id}`}><img src={item.image} alt={item.name} /></Link>
       <h3 className={styles["box-h3"]}><Link to={`../seller/${item._id}`}>{item.name}</Link></h3>
			 <h5 className={styles["box-h5"]}>Joined: {(item.createdAt).slice(0, 10)}</h5>
       <span onClick={() => handlerUnfollow(item)} className='btn-red'>Unfollow</span>
        
    </div>
    </>
  )
}

export default FollCustomerInfo
