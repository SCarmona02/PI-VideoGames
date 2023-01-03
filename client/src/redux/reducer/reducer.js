import { GET_ALL_VIDEOGAMES, ERROR, GET_VIDEOGAME_QUERY, GET_VIDEOGAME_DETAIL, GET_ALL_GENRES, FILTER_BY_GENRE } from "../actions/actions";

const initialState = {
    videoGames: [],
    genres: [],
    videoGameDetail: {},
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
            };

        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videoGameDetail: action.payload
            };

        case FILTER_BY_GENRE:
            const allGamesFG = [...state.videoGames];
            let gamesByGenre = [];
            allGamesFG.forEach(game =>  game.genres.forEach(genre => genre.name === action.payload ? gamesByGenre.push(game) : false))
            return {
                ...state,
                videoGames: gamesByGenre,
                error: gamesByGenre.length > 0 ? false : `There are no videogame with the genre ${action.payload}`
            }
        
        case GET_ALL_GENRES: 
        return {
            ...state,
            genres: action.payload
        };

        default:
            return {
                ...state
            };
    }
}

export default rootReducer;