import React from "react";
import {Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {Home} from "./pages/Home";
import {Favorites} from "./pages/Favorites";
import {StorageContext} from "./context";
import {Purchases} from "./pages/Purchases";


export const App = () => {
    const {cartProducts, cartOpened, setCartOpened, isLoading} = React.useContext(StorageContext)
    return (
        <div className="wrapper clear">
            <Drawer products={cartProducts} opened={cartOpened}
            />
            <Header onClickCart={() => setCartOpened(true)}/>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="favorites" element={<Favorites isLoading={isLoading}/>}/>
                <Route path="purchases" element={<Purchases isLoading={isLoading}/>}/>
            </Routes>
        </div>

    );
}


