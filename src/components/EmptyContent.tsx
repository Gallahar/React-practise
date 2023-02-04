import React from "react";
import {Link} from 'react-router-dom'

type TEmptyContentProps = {
    img:string;
    tittle:string;
    description:string;
}

export const EmptyContent=({img,tittle,description}:TEmptyContentProps)=> {
    return (
        <div className="content p-40 emptyContent ">
            <div className=" flex-column justify-center align-center mb-40 ">
                <img src={img} alt="пустые закладки"/>
                <h1>{tittle}</h1>
                <p>{description}</p>
                <Link to="/">
                    <button className="greenButton"><img src="img/arrowRight.svg" alt="arrow-left"/>Вернуться назад</button>
                </Link>
            </div>
        </div>


    )

}
