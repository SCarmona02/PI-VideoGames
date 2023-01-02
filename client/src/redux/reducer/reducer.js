import { GET_ALL_VIDEOGAMES, ERROR, GET_VIDEOGAME_QUERY } from "../actions/actions";

const initialState = {
    videoGames: [],
    error: "",
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videoGames: action.payload,
            };

        case ERROR:
            return {
                ...state,
                error: action.payload
            };

        case GET_VIDEOGAME_QUERY:
            return {
                ...state,
                videoGames: action.payload
            }

        default:
            return {
                ...state
            };
    }
}

export default rootReducer;