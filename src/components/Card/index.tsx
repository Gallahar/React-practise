import styles from './Card.module.scss'
import React from "react";
import {StorageContext, TCartProduct, TFavoriteProduct, TProduct} from "../../context";


interface TCardProps extends  TProduct {
    onFavorite: (obj: TFavoriteProduct) => void;
    onAdd?: (obj: TCartProduct) => void;
}

const Card = ({
                  id,
                  tittle, price, imgUrl,
                  onFavorite,
                  onAdd,
              }: TCardProps) => {
    const {isProductChecked} = React.useContext(StorageContext);
    const [isFavorite, setIsFavorite] = React.useState(false);
    const obj = {id, tittle, price, imgUrl, mainId: id}
    const onClickAdd = () => {
        if(onAdd!==undefined){
        onAdd(obj);
        }

    };
    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite)
    };

    return (
        <div className={styles.Card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"} alt="favorite"/>
            </div>
            <img width={133} height={112} src={imgUrl} alt="Sneakers"/>
            <h5>{tittle}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img onClick={onClickAdd} className={styles.plus}
                     src={!(isProductChecked) || isProductChecked(id) ? "img/btn-checked.svg" : "img/add.svg"}
                     alt="add"/>
            </div>
        </div>
    )
}

export default Card;