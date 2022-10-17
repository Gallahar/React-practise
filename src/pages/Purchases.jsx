import React, {Fragment} from "react";
import Card from "../components/Card";
import axios from "axios";
import StorageContext from "../context";
import EmptyContent from "../components/EmptyContent";


function Purchases({isLoading}) {
    const {onAddToFavorite} = React.useContext(StorageContext)
    const [purchases, setPurchases] = React.useState([])
    React.useEffect(() => {
        const getPurchases = async () => {
            try {
                const purchasesResponse = await axios.get('https://6339c674d6ef071af8164d58.mockapi.io/Orders')
                setPurchases(purchasesResponse.data)
            } catch (error) {
                console.log('Не удалось получить данные о покупках')
            }

        }
        getPurchases()
    }, [])


    return (
        <div className="content p-40 ">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои покупки:</h1>
            </div>
            <div className="d-flex flex-wrap">
                {isLoading ? Array(8).fill(undefined).map((_, i) => <Card key={i}
                                                                          loading={isLoading}/>) :purchases.length>0? purchases.map(({
                                                                                                                      id,
                                                                                                                      products
                                                                                                                  }) => (
                    <Fragment key={id}>
                        {products.map(product => (
                                <Card
                                    key={product.id}
                                    id={product.id}
                                    tittle={product.tittle}
                                    price={product.price}
                                    imgUrl={product.imgUrl}
                                    onFavorite={onAddToFavorite}
                                />
                            )
                        )}
                    </Fragment>
                )):<EmptyContent img={"img/empty-purchases.jpg"} tittle={"У вас нету заказов"}
                                 description={"Оформите хотя бы один заказ"}/>}
            </div>
        </div>
    )
}

export default Purchases