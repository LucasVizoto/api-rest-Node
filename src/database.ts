import knex from "knex";

export const knex_conn = knex({
    client: 'sqlite',
    connection: {
        filename: './tmp/app.db',
    }
})