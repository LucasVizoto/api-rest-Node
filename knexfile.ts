import { Knex } from 'knex';

const config: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: './db/app.db',
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    }
}

export default config;