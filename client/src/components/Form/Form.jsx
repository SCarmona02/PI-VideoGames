import React, { useState, useEffect } from "react";
import style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllVideoGames, getAllGenres, getVideoGameQuery, setError, setGames, createVideoGame } from "../../redux/actions/actions";

const validate = (input) => {
    let errors = {};
    if(input.name.length < 3){
        errors.name = "*The videogame's name is required (3 letters min)"
    }

    if(input.description.length < 3){
        errors.description = "Description is required (3 letters min)"
    }

    if(input.platforms.length < 1){
        errors.platforms = "Platforms is required (1 platform min)"
    }

    if(parseInt(input.released) < 1950 ||  parseInt(input.released) > 2024){
        errors.released = "Date must be between 1950 - 2024"
    }

    if(parseFloat(input.rating) < 0.01 || parseFloat(input.rating) > 5){
        errors.rating = "Rating must be between 0.01 - 5"
    }
    
    if(input.image.length > 0 && !(/\S+\.\S+/).test(input.image)) {
        errors.image = "Image must be URL"
    }

    return errors;
}

const Form = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const findGame = useSelector(state => state.videoGames);
    const [loading, setLoading] = useState("");
    const [platform, setPlatform] = useState("")
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

        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }))

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
            event.preventDefault();
            if(!input.platforms.includes(platform)){
                setInput({
                    ...input,
                    platforms: [...input.platforms, platform]
                })
                setPlatform("")
                setErrors(validate({
                    ...input,
                    platforms: [...input.platforms, platform]
                }))
            }
        }
    }

    const handlePlatform = (event) => {
        setPlatform(event.target.value)
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
        setErrors(validate({
            ...input,
            platforms: newPlatforms
        }))
    }

    let buttonDisabled = !(input.name.length) || !(input.description.length) || !(input.platforms.length) || (errors.name || errors.description || errors.released || errors.rating || errors.platforms || errors.image)

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
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label htmlFor="description">Description: <span>*</span></label>
                    <textarea value={input.description} name="description" autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="Description"></textarea>
                    {errors.description && (<p>{errors.description}</p>)}
                </div>
                <div>
                    <label htmlFor="released">Released: </label>
                    <input type="date" value={input.released} name="released" min="1950-01-01" max="2024-01-01" autoComplete="off" onChange={(event) => changeHandler(event)}></input>
                    {errors.released && (<p>{errors.released}</p>)}
                </div>
                <div>
                    <label htmlFor="rating">Rating: </label>
                    <input type="number" step="0.01" min="0.01" max="5" value={input.rating} name="rating" autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="0,01 - 5,0"></input>
                    {errors.rating && (<p>{errors.rating}</p>)}
                </div>
                <div>
                    <label htmlFor="platforms">Platforms: <span>*</span></label>
                    <input type="text" value={platform} onChange={(event) => handlePlatform(event)} autoComplete="off" placeholder="Platform"></input>
                    {errors.platforms && (<p>{errors.platforms}</p>)}
                    <button name="platforms" onClick={(event) => handleSelect(event)}>+</button>
                    {input.platforms?.map((platform, index) => {
                        return (
                            <div key={index}>
                                <span key={platform}>{platform}</span>
                                <button name={platform} onClick={(event) => handleDeletePlatform(event)}>X</button>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <label htmlFor="image">Image: </label>
                    <input type="url" value={input.image} name="image" autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="URL"></input>
                    {errors.image && (<p>{errors.image}</p>)}
                </div>
                <div>
                    <label htmlFor="genres">Genres: </label>
                    <select name="genres" onChange={(event) => handleSelect(event)} defaultValue="title">
                        <option value="title" disabled name="Genres">Genres</option>
                        {genres.map(genre => {
                            return (
                                <option value={genre.name} key={genre.id}>{genre.name[0].toUpperCase() + genre.name.slice(1)}</option>
                            )
                        })}
                    </select>
                    {input.genres?.map((genre, index) => {
                        return (
                            <div key={index}>
                                <span key={genre}>{genre[0].toUpperCase() + genre.slice(1)}</span>
                                <button name={genre} onClick={(event) => handleDeleteGenre(event)}>X</button>
                            </div>
                        )
                    })}
                </div>

                <button disabled={buttonDisabled} type="submit">Save</button>
            </form>
        </div>
    )
}

export default Form;