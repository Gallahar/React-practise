import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import React from "react";
import StorageContext from "../../context";

function Card({
                  id,
                  tittle,
                  price,
                  imgUrl,
                  onFavorite,
                  onAdd,
                  favorited = false,
                  loading = false
              }) {
    const {isProductChecked} = React.useContext(StorageContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = {id, mainId: id, tittle, price, imgUrl}
    const onClickAdd = () => {
        onAdd(obj);

    };
    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite)
    };

    return (
        <div className={styles.Card}>
            {loading ? <ContentLoader
                speed={2}
                width={150}
                height={200}
                viewBox="0 0 150 200"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="119" rx="5" ry="5" width="150" height="15"/>
                <rect x="0" y="23" rx="10" ry="10" width="150" height="90"/>
                <rect x="0" y="141" rx="3" ry="3" width="93" height="15"/>
                <rect x="0" y="169" rx="3" ry="3" width="80" height="24"/>
                <rect x="118" y="162" rx="8" ry="8" width="32" height="32"/>
            </ContentLoader> : <>
                <div className={styles.favorite} onClick={onClickFavorite}>
                    <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="favorite"/>
                </div>
                <img width={133} height={112} src={imgUrl} alt="Sneakers"/>
                <h5>{tittle}</h5>
                <div className="d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                        <span>Цена:</span>
                        <b>{price} руб.</b>
                    </div>
                    {onAdd &&
                        (<img onClick={onClickAdd} className={styles.plus}
                             src={isProductChecked(id) ? "/img/btn-checked.svg" : "/img/add.svg"} alt="add"/>)}
                </div>
            </>}
        </div>
    )
}

export default Card;