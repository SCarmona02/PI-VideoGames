require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre } = require("../db");

const genresApi = "https://api.rawg.io/api/genres";

module.exports = {
    allGenres: async function() {
        let genres = [];

        const responseFromAPI = await axios.get(`${genresApi}?key=${API_KEY}`);

        responseFromAPI.data.results.map(async genero => {
            let data = { "id": genero.id, "name": genero.name.toLowerCase() }
            genres.push(data);
            await Genre.findOrCreate({where: { id: data.id, name: data.name }});
        })

        return genres;
    }
}