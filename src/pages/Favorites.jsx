import React, {Fragment} from "react";
import Card from "../components/Card";
import StorageContext from "../context";
import EmptyContent from "../components/EmptyContent";


function Favorites({isLoading}) {
    const {favorites, onAddToFavorite} = React.useContext(StorageContext)
    return (
        <div className="content p-40 ">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{favorites.length > 0 ? "Товары которые вам понравились:" : ""}</h1>
            </div>
            <div className="d-flex flex-wrap">
                {isLoading ? Array(8).fill(undefined).map((_, i) => <Card key={i}
                                                                          loading={isLoading}/>) : favorites.length > 0 ? favorites.map((item, id) => (
                    <Fragment key={id}>
                        <Card
                            key={item.id}
                            price={item.price}
                            imgUrl={item.imgUrl}
                            tittle={item.tittle}
                            id={item.id}
                            favorited={true}
                            onFavorite={onAddToFavorite}
                        />
                    </Fragment>
                )) : <EmptyContent img={"img/empty-favorite.jpg"} tittle={"Закладок нету"}
                                   description={"Вы ничего не добавили в закладки"}/>}
            </div>
        </div>
    )
}

export default Favorites