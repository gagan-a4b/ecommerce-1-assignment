// db.js
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'gagan',
  host: 'localhost',
  database: 'ecommerce',
  password: '12345',
  port: 5432, // default PostgreSQL port
});

pool.on('connect', () => console.log('PostgreSQL connected'));
pool.on('error', (err) => console.error('PostgreSQL error', err));



