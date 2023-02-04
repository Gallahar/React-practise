import React, {Fragment} from "react";
import Card from "../components/Card";
import {StorageContext} from "../context";
import {EmptyContent} from "../components/EmptyContent";
import {Loader} from "../components/Card/Skeleton"

type TFavoritesProps ={
    isLoading:boolean
}

export const Favorites=({isLoading}:TFavoritesProps)=> {
    const {favorites, onAddToFavorite} = React.useContext(StorageContext)
    return (
        <div className="content p-40 ">
            <div className="d-flex align-center mb-40 justify-between">
                {favorites.length > 0 ?<h1>Товары которые вам понравились:</h1>:null}
            </div>
            <div className="d-flex flex-wrap">
                {isLoading ?Loader : favorites.length > 0 ? favorites.map((item, id) => (
                    <Fragment key={id}>
                        <Card
                            key={item.id}
                            price={item.price}
                            imgUrl={item.imgUrl}
                            tittle={item.tittle}
                            id={item.id}
                            onFavorite={onAddToFavorite}
                        />
                    </Fragment>
                )) : <EmptyContent img={"img/empty-favorite.jpg"} tittle={"Закладок нету"}
                                   description={"Вы ничего не добавили в закладки"}/>}
            </div>
        </div>
    )
}

