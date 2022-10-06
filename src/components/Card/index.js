import styles from './Card.module.scss'
import React from "react";
function Card ({tittle,price,imgUrl,onFavorite,onAdd}){
    const [isAdded,setIsAdded] = React.useState(false)
    const onClickAdd =()=>{
        onAdd({tittle,price,imgUrl})
        setIsAdded(!isAdded)
    }
   return (
       <div className={styles.Card}>
           <div className={styles.favorite}>
               <img src="img/heart-unliked.svg" alt="heart-unliked"/>
           </div>
           <img width={133} height={112} src={imgUrl} alt="Sneakers"/>
           <h5>{tittle}</h5>
           <div className="d-flex justify-between align-center">
               <div className="d-flex flex-column">
                   <span>Цена:</span>
                   <b>{price} руб.</b>
               </div>
                   <img onClick={onClickAdd} className={styles.plus}  src={isAdded?"/img/btn-checked.svg":"/img/add.svg"} alt="add" />
           </div>
       </div>
   )
}

export default Card;