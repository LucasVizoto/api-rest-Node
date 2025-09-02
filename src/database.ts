import 'dotenv/config' 
import { knex, Knex } from 'knex';

//console.log(process.env)

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL env not defined')
}

export const config: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: process.env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    }
}

export const knex_conn = knex(config)