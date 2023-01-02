import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ item }) => {
    return (
        <Link>
            <h3>{item.nombre}</h3>
            <img src={item.image} alt={item.name}></img>
            {item.genres.map(genre => {
                return <div key={genre.id}>{genre.name}</div>
            })}
        </Link>
    )
}

export default Card;