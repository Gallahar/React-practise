import React, {useEffect} from "react";
import axios from "axios";
import State from "./State";
import StorageContext from "../context";

function Drawer({onRemoveFromCart, products}) {
    const {cartProducts, setCartProducts, setCartOpened} = React.useContext(StorageContext)
    const [isOrderProceed, setIsOrderProceed] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)
    const [orderPending, setOrderPending] = React.useState(false)
    const pause = (ms) => new Promise(resolve => setTimeout(resolve,ms));
    const onClickOrder = async () => {
        try {
            setOrderPending(!orderPending)
            const {data} = await axios.post('https://6339c674d6ef071af8164d58.mockapi.io/Orders', {products: cartProducts});
            setOrderId(data.id)
            setIsOrderProceed(!isOrderProceed)
            setCartProducts([]);
            for (let i = 0; i <=cartProducts.length ; i++) {
                const item = cartProducts[i]
                await axios.delete(`https://6339c674d6ef071af8164d58.mockapi.io/Cart/${item.id}`)
                await pause(1000)
            }

        } catch (error) {
            alert('Не удалось создать заказ.')
        }
        setOrderPending(!orderPending)
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        window.scrollTo({top: 0})
        return () => {
            document.body.style.overflow = 'initial'
        }
    }, [])

    return (
        <div className="drawerDark">
            <div className="drawer">
                <h2 className="mb-30 d-flex justify-between">Корзина<img onClick={() => setCartOpened(false)}
                                                                         className="removeBtn cu-p"
                                                                         src="img/btn-remove.svg" alt="remove"/></h2>

                {products.length > 0 ? <>
                        <div className="items">
                            {
                                products.map((obj) =>
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        {console.log(obj)}
                                        <div
                                            style={{backgroundImage: `url(${obj.imgUrl})`}}
                                            className="cartItemImg">

                                        </div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img className="removeBtn" onClick={() => onRemoveFromCart(obj.id)}
                                             src="img/btn-remove.svg" alt="remove"/>
                                    </div>)
                            }
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li><span>Итого:</span>
                                    <div></div>
                                    <b>21 498 руб.</b></li>
                                <li><span>Налог 5%:</span>
                                    <div></div>
                                    <b>1074 руб.</b></li>
                            </ul>
                            <button disabled={orderPending} onClick={onClickOrder} className="greenButton">Оформить
                                заказ <img
                                    src="/img/arrowRight.svg" alt="arrowRight"/>
                            </button>
                        </div>
                    </> :
                    <State title={isOrderProceed ? "Заказ оформлен!" : "В корзине ничего нет..."}
                           description={isOrderProceed ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок чтобы сделать заказ"}
                           image={isOrderProceed ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}/>
                }

            </div>

        </div>
    )
}

export default Drawer;