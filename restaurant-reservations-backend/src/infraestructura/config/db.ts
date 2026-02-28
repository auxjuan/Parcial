import mysql from 'mysql2/promise';


const pool = mysql.createPool({

host: 'localhost',
user:'root',
password:'1123433815juansehr$',
database: 'restaurante_db',
waitForConnections: true,
connectionLimit: 10,
queueLimit:0
       
});

export const obtenerConexion =async () => {
    return await pool.getConnection();
};

export default pool;
