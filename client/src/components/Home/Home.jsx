import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, getAllVideoGames, filterByGenre } from "../../redux/actions/actions";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Error from "../Error/Error";

const Home = () => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const videoGames = useSelector(state => state.videoGames);
    const genres = useSelector(state => state.genres);
    const [selectGenre, setSelectGenre] = useState({ genre: [], exist: [] });

    useEffect(() => {
        if (videoGames.length) {

        } else {
            dispatch(getAllVideoGames());
            dispatch(getAllGenres());
        }
    }, [dispatch, videoGames.length])

    const handleFilterGenre = (event) => {
        if (event.target.value === "all") {
            dispatch(getAllVideoGames());
        } else {
            event.preventDefault();
            dispatch(filterByGenre(event.target.value))

            setSelectGenre({
                ...selectGenre,
                genre: [event.target.value]
            })
        }
    };

    const handleDeleteType = (event) => {
        event.preventDefault();
        setSelectGenre({
            genre: [],
            exist: []
        })
        window.location.reload()
        dispatch(getAllVideoGames());
    }

    let selectDisabled = (!!selectGenre.genre.length)

    if (error) {
        return (
            <>
                <Error></Error>
            </>
        )
    } else if (videoGames.length) {

        return (
            <div>
                <Navbar />
                <select disabled={selectDisabled} onChange={event => handleFilterGenre(event)} defaultValue="title">
                    <option value="title" disabled>Genres</option>
                    <option value="all">All</option>
                    {genres.map(genre => {
                        return <option value={genre.name} key={genre.id}>{genre.name[0].toUpperCase() + genre.name.slice(1)}</option>
                    })}
                </select>
                {selectGenre.genre?.map((genre, index) => {
                    return (
                        <div key={index}>
                            <span key={genre}>{genre[0].toUpperCase() + genre.slice(1)}</span>
                            <button name={genre} onClick={event => handleDeleteType(event)}>X</button>
                        </div>
                    )
                })}
                <div>
                    {videoGames.map(game => {
                        return <Card key={game.id} item={game} />
                    })}
                </div>
            </div>
        )

    } else {
        return (
            <>
                <Navbar />
                <div>
                    <h1>Loading...</h1>
                </div>
            </>
        )
    }

}

export default Home;