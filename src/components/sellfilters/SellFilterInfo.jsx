import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../Store'
import styles from "./SellFilter.module.scss";

const SellFilterInfo = ({user}) => {

    
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { wish } = state;


     //if exists seller
     const sellerExists = wish.wishItems.find((x) => x._id === user._id);

     const existUser = localStorage.getItem("userInfo");

     const handlerFollow = () => {
 
        if(!existUser) {

            window.alert('Sorry. You must login.');

        } else {

            //If there is a user I am already following (localstorage), his id, from db
            const existItem = wish.wishItems.find((x) => x._id === user._id);
            const quantity = existItem ? existItem.quantity : 1;
            
            if (existItem) {
                window.alert('Sorry. You are already following this user.');
                return;
            }
            
            ctxDispatch({
                type: 'WISH_ADD_ITEM',
                payload: { ...user, quantity },
            });
        }
     
     }

     const handlerUnfollow = (user) => {

        ctxDispatch({
            type: 'WISH_REMOVE_ITEM',
            payload: user,
        });

    }

  return (
    
    <div className={styles.box} key={user._id}>
                    { !user.image  ? <Link to={`../seller/${user._id}`}><img  src="https://res.cloudinary.com/db7jv57dm/image/upload/v1667836050/userImage.png" alt={user.name} /></Link> :  
                     <Link to={`../seller/${user._id}`}><img src={user.image} alt={user.name} /></Link> }

       
        <h3 className={styles["box-h3"]}><Link to={`seller/${user._id}`}>{user.name}</Link></h3>
            <h5 className={styles["box-h5"]}>Joined: {(user.createdAt).slice(0, 10)}</h5>
            {existUser && sellerExists ? (<span onClick={() => handlerUnfollow(user)} className='btn-red'>Unfollow</span>) : (<span key={user._id} onClick={handlerFollow} className='btn'>Follow</span>)}
    </div>
  )
}

export default SellFilterInfo
