import React, {Dispatch, SetStateAction} from 'react'
import axios from "axios";

interface IStorageContext {
    isProductChecked: (arg: string) => boolean;
    products:TProduct[]|[];
    cartProducts:ICartProduct[];
    favorites:IFavoriteProduct[];
    onAddToFavorite:(obj:IFavoriteProduct)=>void;
    onAddToCart:(obj:ICartProduct)=>void;
    setCartOpened:Dispatch<SetStateAction<boolean>>;
    setSearchInput:Dispatch<SetStateAction<string>>;
    setCartProducts:Dispatch<SetStateAction<ICartProduct[] | []>>;
    setIsOrderProceed:Dispatch<SetStateAction<boolean>>;
    setIsLoading:Dispatch<SetStateAction<boolean>>;
    onChangeSearchInput:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    isOrderProceed:boolean;
    cartOpened:boolean;
    isLoading:boolean;
    searchInput:string;

}

export const StorageContext = React.createContext<IStorageContext>({} as IStorageContext)


export interface IFavoriteProduct extends TProduct {
    mainId: string;

}

export interface ICartProduct extends TProduct  {
    mainId: string;

}

export type TProduct = {
    id: string;
    tittle: string;
    price: number,
    imgUrl: string;
}

type TStorageContextProvider = {
    children: React.ReactNode;
}

export const StorageContextProvider = ({children}: TStorageContextProvider) => {
    const [products, setProducts] = React.useState<[] | TProduct[]>([])
    const [favorites, setFavorites] = React.useState<[]|IFavoriteProduct[]>([])
    const [cartProducts, setCartProducts] = React.useState<[]|ICartProduct[]>([])
    const [searchInput, setSearchInput] = React.useState('')
    const [cartOpened, setCartOpened] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)
    const [isOrderProceed, setIsOrderProceed] = React.useState(false)

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


    const onAddToCart = async (obj:ICartProduct) => {
        try {
            const findProduct = cartProducts.find(cartObj => Number(cartObj.mainId) === Number(obj.id))
            if (findProduct) {
                setCartProducts(prev => prev.filter(item => Number(item.mainId) !== Number(obj.id)));
                await axios.delete(`https://6339c674d6ef071af8164d58.mockapi.io/Cart/${findProduct.id}`);
            } else {
                setCartProducts(prev => [...prev, obj]);
                const {data} = await axios.post('https://6339c674d6ef071af8164d58.mockapi.io/Cart', obj);
                setCartProducts((prev) => prev.map((item) => item.mainId === data.mainId ? {
                    ...item,
                    id: data.id
                } : item))
            }

        } catch (error) {
            alert("Не удалось добавить товар в корзину")
            console.error(error)
        }

    };



    const onAddToFavorite = async (obj:IFavoriteProduct) => {
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


    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)


    }

    const isProductChecked = (id:string):boolean => {
        return cartProducts.some(product => Number(product.mainId) === Number(id))


    }
    return(
        <StorageContext.Provider value={{products,setSearchInput,
            cartProducts,
            favorites,
            isProductChecked,
            onAddToFavorite,
            onAddToCart,
            setCartOpened,
            setCartProducts,
            setIsOrderProceed,
            isOrderProceed,
            cartOpened,
            isLoading,
            setIsLoading,
            searchInput,
            onChangeSearchInput
        }}>
            {children}
            </StorageContext.Provider>
    )


}