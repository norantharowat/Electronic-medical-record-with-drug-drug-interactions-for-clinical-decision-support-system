const knex = require('knex')
const { attachPaginate } = require('knex-paginate');
attachPaginate();

const db=knex({
    // Enter your own database information here based on what you created
    client: 'mysql2',
    connection: {
        host: 'eu-cdbr-west-01.cleardb.com',
        user: '...',
        password: '...',
        database: 'heroku_e70fec14c252d2b'
    }
});
module.exports=db;
