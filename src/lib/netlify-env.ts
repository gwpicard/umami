import { createHash } from 'node:crypto';

// SmartAI Labs deployment on Netlify Database (fork branch smartai-netlify).
// Netlify injects the connection string as NETLIFY_DB_URL; Umami reads DATABASE_URL.
// APP_SECRET falls back to a hash of the connection string, as Umami 2 did with DATABASE_URL,
// so no secret has to be created or copied by hand. Setting either variable explicitly still wins.
if (!process.env.DATABASE_URL && process.env.NETLIFY_DB_URL) {
  process.env.DATABASE_URL = process.env.NETLIFY_DB_URL;
}

if (!process.env.APP_SECRET?.trim() && process.env.NETLIFY_DB_URL) {
  process.env.APP_SECRET = createHash('sha256')
    .update(`umami-app-secret:${process.env.NETLIFY_DB_URL}`)
    .digest('hex');
}

export {};
