import { Pool } from 'pg'; // Import the Pool class from the pg module

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // set in your .env.local file
});

export default pool;
