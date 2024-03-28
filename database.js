import pkg from 'pg';
const { Pool } = pkg;

const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345',
    port: 5432,
});

export const excuteQuery = async (sqlQuery) => {
    const response =  client.query(sqlQuery)
    if (response)
        return response;
    return " Error"
}