import Card from "../components/Card";

import React from "react"

function Home({
                  cartProducts,
                  searchInput,
                  setSearchInput,
                  onChangeSearchInput,
                  products,
                  onAddToCart,
                  onAddToFavorite,
                  isLoading
              }) {

    const renderProducts = () => {
        const filteredProducts = products.filter(item => item.tittle.toLowerCase().includes(searchInput.toLowerCase()));

        return (isLoading ? Array(12).fill(<Card  loading={isLoading}/>)
            : filteredProducts).map((item) => (
            <Card
                key={item.id}
                id={item.id}
                price={item.price}
                imgUrl={item.imgUrl}
                tittle={item.tittle}
                onAdd={onAddToCart}
                onFavorite={onAddToFavorite}
                loading={isLoading}
            />
        ))
    }

    return (
        <div className="content p-40 ">
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
                {renderProducts()}
            </div>
        </div>
    )
}

export default Home