import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";



function App() {
    const [products,setProducts] = React.useState([])
    const [cartProducts,setCartProducts] = React.useState([])
    const [searchInput,setSearchInput] = React.useState('')
    const [cartOpened, setCartOpened] = React.useState(false)
    React.useEffect(()=>{
        fetch('https://6339c674d6ef071af8164d58.mockapi.io/products').then((res)=>{
            return res.json()
        }).then((json)=>{
            setProducts(json)
        })
    },[])

    const onAddToCart = (obj) =>{
     return   cartProducts.hasOwnProperty(obj)?[...new Set(cartProducts)]:setCartProducts([...cartProducts,obj])
    };

    const onChangeSearchInput = (event)=>{
        setSearchInput(event.target.value)

    }

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer products={cartProducts} onClose={() => setCartOpened(false)}/>}
            <Header onClickCart={() => setCartOpened(true)}/>
            <div className="content p-40 ">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>{searchInput?`Поиск по запросу: "${searchInput}"`:'Все кроссовки'}</h1>
                    <div className="search-block  d-flex">
                        <img src="img/Search.svg" alt="search"/>
                        {searchInput&&<img className="removeBtn Clear cu-p" src="img/btn-remove.svg" onClick={()=>setSearchInput('')} alt="Clear"/>}
                        <input placeholder="Поиск..." value={searchInput} onChange={onChangeSearchInput }/>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {products.map((product) => (
                        <Card
                              key={product.imgUrl}
                              price={product.price}
                              imgUrl={product.imgUrl}
                              tittle={product.tittle}
                              onAdd={onAddToCart}
                              onFavorite={()=>console.log('добавили в любимое')}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
