import React from "react";
import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import StorageContext from "./context";
import Purchases from "./pages/Purchases";


function App() {
    const [products, setProducts] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [cartProducts, setCartProducts] = React.useState([])
    const [searchInput, setSearchInput] = React.useState('')
    const [cartOpened, setCartOpened] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const getData = async () => {
            try {
                const cartResponse = await axios.get('https://6339c674d6ef071af8164d58.mockapi.io/Cart')
                const favoriteResponse = await axios.get('https://6339c674d6ef071af8164d58.mockapi.io/Favorite')
                const productsResponse = await axios.get('https://6339c674d6ef071af8164d58.mockapi.io/products')
                setIsLoading(false)

                setCartProducts(cartResponse.data)
                setFavorites(favoriteResponse.data)
                setProducts(productsResponse.data)
            } catch (error) {
                alert('Не удалось получить данные с mockAPI')
                console.error(error)
            }
        }

        getData();

    }, [])

    const onAddToCart = async (obj) => {
        try { const findProduct = cartProducts.find(cartObj => Number(cartObj.mainId) === Number(obj.id))
            if (findProduct) {
                setCartProducts(prev => prev.filter(item => Number(item.mainId) !== Number(obj.id)));
                await axios.delete(`https://6339c674d6ef071af8164d58.mockapi.io/Cart/${findProduct.id}`);
            } else {
                setCartProducts(prev => [...prev, obj]);
               const {data} = await axios.post('https://6339c674d6ef071af8164d58.mockapi.io/Cart', obj);
                setCartProducts((prev)=>prev.map((item)=>item.mainId===data.mainId?{...item,id: data.id}:item))
            }

        } catch (error) {
            alert("Не удалось добавить товар в корзину")
            console.error(error)
        }

    };

    const removeFromCart = async (id) => {
       try{
           setCartProducts((prev) => prev.filter(item => Number(item.id) !== Number(id)));
           await axios.delete(`https://6339c674d6ef071af8164d58.mockapi.io/Cart/${id}`)
       }catch (error){
           alert('Не удалось удалить товар из корзины')
           console.error(error)
       }
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://6339c674d6ef071af8164d58.mockapi.io/Favorite/${obj.id}`);
                setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                const {data} = await axios.post('https://6339c674d6ef071af8164d58.mockapi.io/Favorite', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в любимые товары!')
            console.error(error)
        }

    };


    const onChangeSearchInput = (event) => {
        setSearchInput(event.target.value)


    }

    const isProductChecked = (id) => {
        return cartProducts.some(product => Number(product.mainId) === Number(id))

    }

    return (
        <StorageContext.Provider value={{
            products,
            cartProducts,
            favorites,
            isProductChecked,
            onAddToFavorite,
            onAddToCart,
            setCartOpened,
            setCartProducts
        }}>
            <div className="wrapper clear">
                <Drawer onRemoveFromCart={removeFromCart} products={cartProducts} opened={cartOpened}
                />
                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route path="/" element={<Home cartProducts={cartProducts}
                                                   searchInput={searchInput}
                                                   setSearchInput={setSearchInput}
                                                   onChangeSearchInput={onChangeSearchInput}
                                                   products={products}
                                                   onAddToCart={onAddToCart}
                                                   onAddToFavorite={onAddToFavorite}
                                                   isLoading={isLoading}
                    />}

                    />
                    <Route path="/favorites"
                           element={<Favorites isLoading={isLoading}/>}/>
                    <Route path="/purchases"
                           element={<Purchases isLoading={isLoading}/>}/>
                </Routes>
            </div>
        </StorageContext.Provider>
    );
}

export default App;
