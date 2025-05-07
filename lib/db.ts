import { Pool } from 'pg'; // Import the Pool class from the pg module

const pool = new Pool({
  connectionString: process.env.NEON_URL, // Use the connection string from the environment variable NEON_URL
});

export default pool;
