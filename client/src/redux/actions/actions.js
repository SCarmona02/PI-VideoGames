import axios from 'axios';

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
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
}