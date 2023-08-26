import { sequelize, DataTypes } from "../db.js";
import usuario from "./usuarios.js";
import canciones from "./canciones.js";

const playlist = sequelize.define('playlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_playlist: {
        type: DataTypes.STRING,
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
    tableName: 'playlist'
});

playlist.belongsTo(usuario, {
    foreignKey: 'id_usuario'
});

playlist.hasMany(canciones, { 
    foreignKey: 'id_playlist'
});

playlist.sync();

export default playlist;