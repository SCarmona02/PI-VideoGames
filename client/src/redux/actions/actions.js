import axios from 'axios';

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME_QUERY = "GET_VIDEOGAME_QUERY";
export const ERROR = "ERROR";

export const getAllVideoGames = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("/videogames");
            const videogames = response.data;
            dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: videogames
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error.message
            })
        }
    }
};

export const setError = () => {
    return {
        type: ERROR,
        payload: false
    }
};

export const getVideoGameQuery = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/videogames?name=${name}`);
            const videogame = response.data;
            dispatch({
                type: GET_VIDEOGAME_QUERY,
                payload: videogame
            })
        } catch (error) {
            dispatch({
                type:ERROR,
                payload: `Searched videogame ${name} not found`
            })
        }
    }
}