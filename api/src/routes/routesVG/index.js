const { Router } = require('express');
const vgController = require("../../controllers/vgController");

const router = Router();

router.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            return res.status(200).send("Game by name!");
        } else {
            const result = await vgController.listGames();
            return res.status(200).json(result);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            return res.status(200).send("Game by Id!");
        } else {
            throw new Error("Id is required");
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

router.post("/", (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

module.exports = router;