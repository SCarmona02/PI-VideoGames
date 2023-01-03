import { GET_ALL_VIDEOGAMES, ERROR, GET_VIDEOGAME_QUERY, GET_VIDEOGAME_DETAIL, GET_ALL_GENRES, FILTER_BY_GENRE, FILTER_CREATED, FILTER_BY_NAME, FILTER_BY_RATING } from "../actions/actions";

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
            };

        case FILTER_CREATED:
            const allGamesFC = [...state.videoGames];
            let createdFilter = action.payload === "created" ? allGamesFC.filter(game => game.createdInDb) : allGamesFC.filter(game => !game.createdInDb)
            return {
                ...state,
                videoGames: action.payload === "all" ? allGamesFC : createdFilter,
                error: createdFilter.length > 0 ? false : "You have not created any videogame"
            };

        case FILTER_BY_NAME:
            const allGamesFN = [...state.videoGames]
            const nameFilter = action.payload === "asc" ? allGamesFN.sort((a, b) => {
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1
                }
                return 0;
            }) : allGamesFN.sort((a, b) => {
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                videoGames: nameFilter
            };

        case FILTER_BY_RATING:
            const allGamesFR = [...state.videoGames]
            const ratingFilter = action.payload === "upRating" ? allGamesFR.sort((a, b) => {
                if(a.rating > b.rating){
                    return -1;
                }
                if(b.rating > a.rating){
                    return 1
                }
                return 0;
            }) : allGamesFR.sort((a, b) => {
                if(a.rating > b.rating){
                    return 1;
                }
                if(b.rating > a.rating){
                    return -1
                }
                return 0;
            })
            return {
                ...state,
                videoGames: ratingFilter
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