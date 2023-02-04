import React, {useContext, useEffect} from "react";
import axios from "axios";
import State from "../State";
import styles from './Drawer.module.scss'
import {useCartProducts} from "../hooks/useCartProducts";
import {StorageContext, ICartProduct} from "../../context";

type TDrawerProps = {
    opened: boolean;
    products: ICartProduct[];
}

function Drawer({products, opened}: TDrawerProps) {
    const {isOrderProceed, setIsOrderProceed} = useContext(StorageContext)
    const {cartProducts, totalPriceCart, setCartProducts, setCartOpened} = useCartProducts()
    const [orderId, setOrderId] = React.useState<null | number>(null)
    const [orderPending, setOrderPending] = React.useState(false)

    const onRemoveFromCart = async (id: string) => {
        try {
            setCartProducts((prev) => prev.filter(item => Number(item.id) !== Number(id)));
            await axios.delete(`https://6339c674d6ef071af8164d58.mockapi.io/Cart/${id}`)
        } catch (error) {
            alert('Не удалось удалить товар из корзины')
            console.error(error)
        }
    };

    const onClickOrder = async () => {

        try {
            setOrderPending(!orderPending)
            const {data} = await axios.post('https://6339c674d6ef071af8164d58.mockapi.io/Orders', {products: cartProducts});
            setOrderId(data.id)
            setIsOrderProceed(!isOrderProceed)
            setCartProducts([]);

            await Promise.all(
                cartProducts.map(({id}) => {
                    return axios.delete(`https://6339c674d6ef071af8164d58.mockapi.io/Cart/${id}`)

                })
            )
        } catch (error) {
            alert('Не удалось создать заказ.')
            console.error(error)
        }
        setOrderPending(!orderPending)

    }
//lock drawer scroll
    useEffect(() => {
        if (opened) {
            document.body.style.overflow = 'hidden'
            window.scrollTo({top: 0})
        } else {

            document.body.style.overflow = 'initial'

        }
    }, [opened])

    return (
        <div className={`${styles.drawerDark} ${opened ? styles.drawerVisible : ""}`}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">Корзина<img onClick={() => setCartOpened(false)}
                                                                         className="removeBtn cu-p"
                                                                         src="img/btn-remove.svg" alt="remove"/></h2>

                {products.length > 0 ? <>
                        <div className="items flex">
                            {
                                products.map((obj) =>
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <div
                                            style={{backgroundImage: `url(${obj.imgUrl})`}}
                                            className="cartItemImg">

                                        </div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.tittle}</p>
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
                                    <div/>
                                    <b>{totalPriceCart} руб.</b></li>
                                <li><span>Налог 5%:</span>
                                    <div/>
                                    <b>{Math.round(totalPriceCart * 0.05)} руб.</b></li>
                            </ul>
                            <button disabled={orderPending} onClick={onClickOrder} className="greenButton">Оформить
                                заказ <img
                                    src="img/arrowRight.svg" alt="arrowRight"/>
                            </button>
                        </div>
                    </> :
                    <State title={isOrderProceed ? "Заказ оформлен!" : "В корзине ничего нет..."}
                           description={isOrderProceed ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок чтобы сделать заказ"}
                           image={isOrderProceed ? "img/complete-order.jpg" : "img/empty-cart.jpg"}/>
                }

            </div>

        </div>
    )
}

export default Drawer;