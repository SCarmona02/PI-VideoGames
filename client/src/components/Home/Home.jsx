import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, getAllVideoGames, filterByGenre, filterCreated, filterByName, filterByRating } from "../../redux/actions/actions";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Error from "../Error/Error";
import Paginado from "./Paginado";

const Home = () => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const videoGames = useSelector(state => state.videoGames);
    const genres = useSelector(state => state.genres);
    const [selectGenre, setSelectGenre] = useState({ genre: [], exist: [] });
    const [orden, setOrden] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 15;
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = videoGames.slice(indexOfFirstGame, indexOfLastGame);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

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

    const handleOrder = (event) => {
        event.preventDefault()
        let value = event.target.value;
        if(value === "asc" || value === "des"){
            dispatch(filterByName(value));
        }
        if(value === "upRating" || value === "downRating"){
            dispatch(filterByRating(value))
        }
        if(value === "def"){
            dispatch(getAllVideoGames());
        }
    }

    const handleFilterCreated = (event) => {
        event.preventDefault();
        dispatch(filterCreated(event.target.value))

        setSelectGenre({
            ...selectGenre,
            exist: [event.target.value]
        })
    }

    const handleDeleteType = (event) => {
        event.preventDefault();
        setSelectGenre({
            genre: [],
            exist: []
        })
        window.location.reload()
        dispatch(getAllVideoGames());
    };
    

    let selectDisabled = (!!selectGenre.genre.length);
    let selectDisabledEx = (!!selectGenre.exist.length);

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
                <select onChange={event => handleOrder(event)} defaultValue="title">
                    <option value="title" disabled>Order</option>
                    <option value="def">Random</option>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                    <option value="upRating">Best</option>
                    <option value="downRating">Worst</option>
                </select>
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

                <select disabled={selectDisabledEx} onChange={event => handleFilterCreated(event)} defaultValue="title">
                    <option value="title" disabled>Origin</option>
                    <option value="all">All</option>
                    <option value="exist">Exist</option>
                    <option value="created">Created</option>
                </select>
                {selectGenre.exist?.map((exist, index) => {
                    return (
                        <div key={index}>
                            <span key={exist}>{exist[0].toUpperCase() + exist.slice(1)}</span>
                            <button name={exist} onClick={event => handleDeleteType(event)}>X</button>
                        </div>
                    )
                })}
                <div>
                    {currentGames.map(game => {
                        return <Card key={game.id} item={game} />
                    })}
                    <Paginado gamesPerPage={gamesPerPage} currentPage={currentPage} videoGames={videoGames.length} paginado={paginado} />
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