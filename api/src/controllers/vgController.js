require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const {Videogame, Genre} = require("../db");

const gamesApi = "https://api.rawg.io/api/games";

module.exports = {

    listGames: async function (name) {
        let array = [];
        let arrayApi = [];
        let necessary = [];

        let responseFromDB = await Videogame.findAll({include: Genre,});
        let responseFromAPI = await axios.get(`${gamesApi}?key=${API_KEY}`);

        arrayApi = [...responseFromAPI.data.results];
        let nextApi = responseFromAPI.data.next;

        for (let i = 0; i < 4; i++){
            let responseFromNextApi = await axios.get(nextApi);
            arrayApi = [...arrayApi, ...responseFromNextApi.data.results]
            nextApi = responseFromNextApi.data.next;
        };

        arrayApi.map((game) => {

            function findGenre(){
                let resultGenre = [];
                game.genres.map((genre) => resultGenre.push({"id": genre.id, "name": genre.name }));
                return resultGenre;
            }

            necessary.push({
                "id": game.id,
                "name": game.name,
                "image": game.background_image,
                "genre": findGenre()
            })
        })

        return necessary;
        
    }

}