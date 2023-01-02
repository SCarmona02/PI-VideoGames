import React from "react";
import style from "./Error.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllVideoGames, setError } from "../../redux/actions/actions";

const Error = () => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const history = useHistory();

    const submitHandler = (event) => {
        history.push("/home");
        event.preventDefault();
        dispatch(getAllVideoGames());
        dispatch(setError());
    }

    return (
        <div>
            <h1>Something went wrong</h1>
            <span>{error}</span>
            <div>
                <button onClick={(event) => submitHandler(event)}>Back</button>
            </div>
        </div>
    )
}

export default Error;