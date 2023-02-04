import ContentLoader from "react-content-loader";
import styles from './Card.module.scss'
import React from "react";

export const Skeleton = ()=>{
    return(
        <div className={styles.Card}>
    <ContentLoader
        speed={2}
        width={150}
        height={200}
        viewBox="0 0 150 200"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="119" rx="5" ry="5" width="150" height="15"/>
        <rect x="0" y="23" rx="10" ry="10" width="150" height="90"/>
        <rect x="0" y="141" rx="3" ry="3" width="93" height="15"/>
        <rect x="0" y="169" rx="3" ry="3" width="80" height="24"/>
        <rect x="118" y="162" rx="8" ry="8" width="32" height="32"/>
    </ContentLoader>
        </div>
    )
}


export const Loader = Array(8).fill(1).map((_, i) => <Skeleton key={i}/>)