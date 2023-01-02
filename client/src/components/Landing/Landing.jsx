import React from "react";
import style from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div>
            <h1>Estoy en la Landing page!</h1>
            <Link to="/home">Home</Link>
        </div>
    )
}

export default Landing;