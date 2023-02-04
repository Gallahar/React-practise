import React from "react";
import {StorageContext} from "../../context";


export const useCartProducts = () => {
    const {cartProducts,setCartProducts,setCartOpened} = React.useContext(StorageContext)
    const totalPriceCart = cartProducts.reduce((sum,obj) => sum + obj.price, 0)
    return {cartProducts,setCartProducts,totalPriceCart,setCartOpened}
}

