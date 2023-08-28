import { sequelize, DataTypes } from "../db.js";
import usuario from "./usuarios.js";


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
    id_usuario: {
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
    tableName: 'playlist'
});

 playlist.belongsTo(usuario, {
     foreignKey: 'id_usuario'
 });


playlist.sync();

export default playlist;