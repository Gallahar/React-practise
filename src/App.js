import React from "react";
import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import StorageContext from "./context";


function App() {
    const [products, setProducts] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [cartProducts, setCartProducts] = React.useState([])
    const [searchInput, setSearchInput] = React.useState('')
    const [cartOpened, setCartOpened] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        async function getData() {

            const cartResponse = await axios.get('https://6339c674d6ef071af8164d58.mockapi.io/Cart')
            const favoriteResponse = await axios.get('https://6339c674d6ef071af8164d58.mockapi.io/Favorite')
            const productsResponse = await axios.get('https://6339c674d6ef071af8164d58.mockapi.io/products')

            setIsLoading(false)

            setCartProducts(cartResponse.data)
            setFavorites(favoriteResponse.data)
            setProducts(productsResponse.data)
        }

        getData();

    }, [])

    const onAddToCart = (obj) => {
        if (cartProducts.find(cartObj => Number(cartObj.id) === Number(obj.id))) {
            axios.delete(`https://6339c674d6ef071af8164d58.mockapi.io/Cart/${obj.id}`);
            setCartProducts(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        } else {
            axios.post('https://6339c674d6ef071af8164d58.mockapi.io/Cart', obj);
            setCartProducts(prev => [...prev, obj]);
        }

    };

    const removeFromCart = (id) => {
        axios.delete(`https://6339c674d6ef071af8164d58.mockapi.io/Cart/${id}`)
        setCartProducts((prev) => prev.filter(item => item.id !== id));
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
        }

    };


    const onChangeSearchInput = (event) => {
        setSearchInput(event.target.value)

    }

    const isProductChecked = (id) => {
        return cartProducts.some(product => Number(product.id) === Number(id))
    }

    return (
        <StorageContext.Provider value={{
            products,
            cartProducts,
            favorites,
            isProductChecked,
            onAddToFavorite,
            setCartOpened,
            setCartProducts
        }}>
            <div className="wrapper clear">
                {cartOpened && <Drawer onRemoveFromCart={removeFromCart} products={cartProducts}
                />}
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
                           element={<Favorites/>}/>
                </Routes>
            </div>
        </StorageContext.Provider>
    );
}

export default App;
