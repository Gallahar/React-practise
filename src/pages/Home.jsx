import Card from "../components/Card";
import React,{Fragment} from "react"

function Home({
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
        return   (isLoading ? Array(8).fill(undefined).map((_, i) => <Card onAdd={(obj)=>onAddToCart(obj)} key={i} loading={isLoading}/>)
            : filteredProducts).map((item,id) => (
                <Fragment  key={id}>
            <Card
                key={item.id}
                {...item}
                onAdd={onAddToCart}
                onFavorite={onAddToFavorite}
                loading={isLoading}
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
                {renderProducts()}
            </div>
        </div>
    )
}

export default Home