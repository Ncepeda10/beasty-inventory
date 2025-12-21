import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Database connection
const connectionString = process.env.DATABASE_URL!;

// For connection pooling
const client = postgres(connectionString, {
  prepare: false,
});

export const db = drizzle(client, { schema });

// Export schema for convenience
export * from './schema';

