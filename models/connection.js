// models/connection.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'dbmasteruser',
  host: 'ls-801a010ba211ba2e70a772ea9be742cc63bc77c8.c3igyeqqodiz.us-east-1.rds.amazonaws.com',
  database: 'geotr3nds60',
  password: '3wW0n]om^<jY{A9[e7M^MLL_U_G&Kp8G',
  port: 5432,
  ssl: {
    rejectUnauthorized: false // Cambiar a `true` para producción asegura que se verificarán los certificados.
  }
});

module.exports = pool;
