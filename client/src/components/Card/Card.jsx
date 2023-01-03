import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ item }) => {
    return (
        <Link to={`/home/${item.id}`}>
            <h3>{item.name[0].toUpperCase() + item.name.slice(1)}</h3>
            <img src={item.image} alt={item.name}></img>
            {item.genres.map(genre => {
                return <div key={genre.id}>{genre.name[0].toUpperCase() + genre.name.slice(1)}</div>
            })}
        </Link>
    )
}

export default Card;