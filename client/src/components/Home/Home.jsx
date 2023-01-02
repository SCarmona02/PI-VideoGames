import React, {useEffect, useState} from "react";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideoGames } from "../../redux/actions/actions";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Error from "../Error/Error";

const Home = () => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const videoGames = useSelector(state => state.videoGames);

    useEffect(() => {
        if(videoGames.length){

        } else {
            dispatch(getAllVideoGames());
        }
    }, [dispatch, videoGames.length])

    if (error){
        return (
            <>
                <Error></Error>
            </>
        )
    } else if (videoGames.length){

        return (
            <div>
                <Navbar />
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