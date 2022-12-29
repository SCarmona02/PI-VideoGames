const { Router } = require('express');
const vgController = require("../../controllers/vgController");

const router = Router();

router.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const result = await vgController.listGames(name);
            return res.status(200).json(result);
        } else {
            const result = await vgController.listGames();
            return res.status(200).json(result);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const result = await vgController.detailGame(id);
            return res.status(200).json(result);
        } else {
            throw new Error("Id is required");
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

router.post("/", async (req, res) => {
    const newGame = req.body;
    try {
        const create = await vgController.newGame(newGame);
        return res.send(create);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

module.exports = router;