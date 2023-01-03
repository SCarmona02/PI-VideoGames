import React, { useEffect } from "react";
import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideoGames, getVideoGameDetail } from "../../redux/actions/actions";
import { NavLink, useHistory } from "react-router-dom";
import Error from "../Error/Error";

const Detail = (props) => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const videogame = useSelector(state => state.videoGameDetail);
    const history = useHistory();
    const idGame = props.match.params.id;

    useEffect(() => {
        dispatch(getVideoGameDetail(idGame))
    }, [dispatch, idGame])

    if (error) {
        return (
            <>
                <Error></Error>
            </>
        )
    } else if (videogame.hasOwnProperty("id") && (videogame.id === parseInt(idGame) || videogame.id === idGame)){

        return (
            <div>
                <NavLink to="/home"><button>Back</button></NavLink><br/>
                <div>
                    <img src={videogame.image} alt={videogame.name} />
                </div>
                <span>Name: {videogame.name}</span><br />
                <span>Description: </span> <span dangerouslySetInnerHTML={{__html: videogame.description}}></span> <br />
                <span>Released: {videogame.released}</span> <br />
                <span>Rating: {videogame.rating}</span> <br />
                <span>Platforms: {videogame.platforms.map(platform => {
                    return <div key={platform.id}>{platform.name}</div>
                })}</span>
                <span>Genres: {videogame.genres.map(genre => {
                    return <div key={genre.id}>{genre.name}</div>
                })}</span>
            </div>
        )
    } else {
        return(
        <>
            <h1>Loading...</h1>
        </>
        )
    }
}

export default Detail;