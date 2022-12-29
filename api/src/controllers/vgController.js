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
        necessary = [...responseFromDB];

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
                "genres": findGenre()
            })
        })

        if (name) {
            array = necessary.filter(game => game.name === name);

            if (array.length > 0) {
                return array;
            } else {
                throw new Error(`Searched VideoGame not found with name ${name}`);
            }
        }

        return necessary;
        
    },

    detailGame: async function (id) {
        let games = await this.listGames();
        let arrayDetail = [];
        let gameFilter = [];
        if (id.length > 6){

        } else {
            id = parseInt(id);
        }

        gameFilter = games.filter(game => game.id === id);

        if (gameFilter.length){
            let responseFromAPI = await axios.get(`${gamesApi}/${id}?key=${API_KEY}`);
            let data = responseFromAPI.data;

            function findGenre(){
                let resultGenre = [];
                data.genres.map((genre) => resultGenre.push({"id": genre.id, "name": genre.name }));
                return resultGenre;
            }

            function findPlatform(){
                let resultPlat = [];
                data.platforms.map((platform) => resultPlat.push({ "id": platform.platform.id, "name": platform.platform.name }));
                return resultPlat;
            }

            let detail = {
                "id": data.id,
                "name": data.name,
                "description": data.description,
                "released": data.released,
                "rating": data.rating,
                "platforms": findPlatform(),
                "image": data.background_image,
                "genres": findGenre()
            }
            arrayDetail.push(detail);

            return arrayDetail;
        } else {
            throw new Error(`Searched VideoGame not found with id ${id}`);
        }
    },

    newGame: async function(body){
        const { name, description, released, rating, platforms, image, genres } = body;

        body.rating ? body.rating = parseFloat(rating) : body.rating = 0.0;

        if (image.length === 0){
            body.image = "https://www.sopitas.com/wp-content/uploads/2017/08/controles-videojuegos.jpg";
        }

        if(!name || !description || !platforms){
            throw new Error('Name, description and platforms are required')
        } else {
            const newVideoGame = await Videogame.create(body);
            if(genres){
                genres.forEach(async genre => {
                    let responseFromDB = await Genre.findAll();
                    responseFromDB.find(genero => genero.name == genre ? newVideoGame.addGenres(genero.id) : false)
                })
            }
            return ("New game registred!")
        }
    }

}