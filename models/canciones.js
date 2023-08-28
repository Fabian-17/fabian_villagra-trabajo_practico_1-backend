import { sequelize, DataTypes } from "../db.js";
import playlist from "./playlist.js";

const canciones = sequelize.define('canciones' , {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_cancion: {
        type: DataTypes.STRING,
        allowNull: false   
    },
    id_playlist: {
        type: DataTypes.INTEGER,
        allowNull: false   
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'canciones'
});

playlist.hasMany(canciones, {
    foreignKey: 'id_playlist'
});

 canciones.belongsTo(playlist, {
     foreignKey: 'id_playlist'
 });


canciones.sync();

export default canciones;