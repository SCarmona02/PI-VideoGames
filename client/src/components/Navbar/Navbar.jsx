import React from "react";
import style from "./Navbar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getVideoGameQuery, getAllVideoGames } from "../../redux/actions/actions";

const Navbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");

    const changeHandler = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const submitHandler = (event) => {
        dispatch(getVideoGameQuery(name))
    }

    const reloadHandler = (event) => {
        history.push("/home");
        window.location.reload();
        dispatch(getAllVideoGames());
        setName("");
    }

    return (
        <div>
            <div>
                <NavLink to="/"><button>Landing</button></NavLink>
            </div>
            <div>
                <input type="text" id="name" autoComplete="off" value={name} onChange={(event) => changeHandler(event)} placeholder="Find your VideoGame..." />
                <button onClick={(event) => submitHandler(event)}>Find it!</button>
            </div>
            <div>
                <NavLink to="/form"><button>Create</button></NavLink>
                <button onClick={(event) => reloadHandler(event)}>Reload</button>
            </div>
        </div>
    )
}

export default Navbar;