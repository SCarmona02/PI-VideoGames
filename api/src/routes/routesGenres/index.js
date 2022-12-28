const {Router} = require ('express');

const router = Router();

router.get("/", (req, res) => {
    try {
        return res.status(200).send("All genres!")
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

module.exports = router;