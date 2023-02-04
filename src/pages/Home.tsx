import Card from "../components/Card";
import {Loader} from "../components/Card/Skeleton"
import React, {Fragment} from "react"
import {StorageContext} from "../context";



export const Home=()=> {
    const {
        searchInput,
        setSearchInput,
        onChangeSearchInput,
        products,
        onAddToCart,
        onAddToFavorite,
        isLoading
    } = React.useContext(StorageContext)

    const renderProducts = () => {
        return  products
            .filter(item => item.tittle.toLowerCase().includes(searchInput.toLowerCase()))
            .map((item, id) => (
                <Fragment key={id}>
                    <Card
                        {...item}
                        onAdd={onAddToCart}
                        onFavorite={onAddToFavorite}
                    />
                </Fragment>
            ))
    }

    return (
        <div className="content p-40 ">
            <div className="slider">

            </div>
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchInput ? `Поиск по запросу: "${searchInput}"` : 'Все кроссовки'}</h1>
                <div className="search-block  d-flex">
                    <img src="img/Search.svg" alt="search"/>
                    {searchInput && <img className="removeBtn Clear cu-p" src="img/btn-remove.svg"
                                         onClick={() => setSearchInput('')} alt="Clear"/>}
                    <input placeholder="Поиск..." value={searchInput} onChange={onChangeSearchInput}/>
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {isLoading?Loader:renderProducts()}
            </div>
        </div>
    )
}

