const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    released: {
      type: DataTypes.STRING,
    },

    rating: {
      type: DataTypes.REAL,
      validate: { min: 0, max: 5}
    },

    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: "https://www.sopitas.com/wp-content/uploads/2017/08/controles-videojuegos.jpg",
      validate: { isUrl: true },
    }
  }, {timestamps: false});
};
