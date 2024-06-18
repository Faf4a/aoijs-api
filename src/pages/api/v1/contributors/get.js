import { sql } from "@vercel/postgres";

// prevent db from exploding
let cache = {
    data: null,
    timestamp: 0
};

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
    try {
        const cacheExpirationTime = 120;
        const now = new Date().getTime();
        const isCacheValid = now - cache.timestamp < cacheExpirationTime * 60 * 1000;

        if (cache.data && isCacheValid) {
            return res.status(200).json({ status: 200, cache: { cacheAge: cache.timestamp, cacheRefresh: cache.timestamp + cacheExpirationTime * 60 * 1000 }, data: cache.data });
        }

        const contributors = await sql`SELECT * FROM contributors;`;
        const parsedData = contributors.rows;

        cache = {
            data: parsedData,
            timestamp: now
        };

        return res.status(200).json({ status: 200, lastUpdated: cache.timestamp, data: parsedData });
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
}
