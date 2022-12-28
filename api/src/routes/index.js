const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const vgRoutes = require("./routesVG/");
const genRoutes = require("./routesGenres/")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", (req, res) => {
    return res.status(200).send("Welcomeeeeee!!!")
});

router.use("/videogames", vgRoutes);
router.use("/genres", genRoutes);

module.exports = router;
