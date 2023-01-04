import React, { useState, useEffect } from "react";
import style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllVideoGames, getAllGenres, getVideoGameQuery, setError, setGames, createVideoGame } from "../../redux/actions/actions";

const Form = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const findGame = useSelector(state => state.videoGames);
    const [loading, setLoading] = useState("");
    const genres = useSelector(state => state.genres);

    const [input, setInput] = useState({
        "name": "",
        "description": "",
        "released": "",
        "rating": "",
        "platforms": [],
        "image": "",
        "genres": []
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getAllGenres());
        dispatch(setGames());
    }, [dispatch]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(createVideoGame(input));
        alert("Created!");
        setInput({
            "name": "",
            "description": "",
            "released": "",
            "rating": "",
            "platforms": [],
            "image": "",
            "genres": []
        });
        history.push("/home");
        dispatch(getAllVideoGames());
    }

    const changeHandler = async (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })

        if(event.target.name === "name"){
            await setLoading("Loading");
            await dispatch(setGames());
            await dispatch(getVideoGameQuery(event.target.value.toLowerCase()));
            await dispatch(setError(false));
            await setLoading("");
        }
    }

    const handleSelect = (event) => {
        if(event.target.name === "genres"){
            if(!input.genres.includes(event.target.value)){
                setInput({
                    ...input,
                    genres: [...input.genres, event.target.value]
                })
            }
        }
        if(event.target.name === "platforms"){
            if(!input.platforms.includes(event.target.value)){
                setInput({
                    ...input,
                    platforms: [...input.platforms, event.target.value]
                })
            }
        }
    }

    const handleDeleteGenre = (event) => {
        event.preventDefault();
        let newGenres = input.genres.filter(genre => genre !== event.target.name)
        setInput({
            ...input,
            genres: newGenres
        })
    }

    const handleDeletePlatform = (event) => {
        event.preventDefault();
        let newPlatforms = input.platforms.filter(platform => platform !== event.target.name)
        setInput({
            ...input,
            platforms: newPlatforms
        })
    }

    return (
        <div>
            <div>
                <NavLink to="/home"><button>Back</button></NavLink>
            </div>
            <form onSubmit={(event) => submitHandler(event)}>
                <div>
                    <label htmlFor="name">Name: <span>*</span></label>
                    <input type="text" value={input.name} name="name" autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="Name"></input>
                    {loading === "Loading" && (<p>Cargando...</p>)}
                    {findGame.length && input.name.length ? (<p>This videogame already exist</p>) : false}
                </div>
                <div>
                    <label htmlFor="description">Description: <span>*</span></label>
                    <textarea value={input.description} name="description" autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="Description"></textarea>
                </div>
                <div>
                    <label htmlFor="released">Released: </label>
                    <input type="date" value={input.released} name="released" min="1950-01-01" max="2024-01-01" autoComplete="off" onChange={(event) => changeHandler(event)}></input>
                </div>
            </form>
        </div>
    )
}

export default Form;