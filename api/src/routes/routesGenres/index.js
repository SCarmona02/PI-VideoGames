const {Router} = require ('express');
const generoController = require("../../controllers/genresController")

const router = Router();

router.get("/", async (req, res) => {
    try {
        const result = await generoController.allGenres();
        return res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

module.exports = router;