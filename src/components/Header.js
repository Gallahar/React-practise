import React from "react";
import {Link} from 'react-router-dom'
import {useCartProducts} from "./hooks/useCartProducts";
function Header(props){
  const {totalPriceCart} = useCartProducts()
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <Link to="">
                    <img width={40} height={40} src="img/logo.png" alt="logo"/>
                </Link>
                <div >
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p className="opacity-5">Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-20 cu-p"><img width={18} height={17} src="img/cart.svg" alt="cart"/>
                    <span>{totalPriceCart} руб.</span>
                </li>
                <li>
                    <Link to="favorites">
                        <img className="mr-20 cu-p" src="img/Favorite.svg" alt="Favorite" width={21} height={19} />
                    </Link>
                </li>
                <li>
                    <Link to="purchases">
                    <img width={20} height={20} src="img/user.svg" alt="user"/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;