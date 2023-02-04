import React from "react";
import {StorageContext} from "../context";

type TStateProps = {
    title:string;
    image:string;
    description:string;

}

const State = ({title,image,description}:TStateProps) =>{
    const {setCartOpened,setIsOrderProceed} = React.useContext(StorageContext)
    return(
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={120}  src={image} alt="КорзинаЗакрыта"/>
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button className="greenButton" onClick={() => {setCartOpened(false);setIsOrderProceed(false)}}>
                <img src="img/arrowRight.svg" alt="ArrowLeft"/>Вернуться назад
            </button>
        </div>
    )
}


export default State