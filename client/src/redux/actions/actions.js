import axios from 'axios';

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME_QUERY = "GET_VIDEOGAME_QUERY";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE"
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
};

export const getVideoGameDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/videogames/${id}`);
            const videogame = response.data.pop();
            dispatch({
                type: GET_VIDEOGAME_DETAIL,
                payload: videogame
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: `Searched videogame with id ${id} not found`
            })
        }
    }
};

export const getAllGenres = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/genres`);
            const genres = response.data;
            dispatch({
                type: GET_ALL_GENRES,
                payload: genres
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error.message
            })
        }
    }
};

export const filterByGenre = (payload) => {
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}