import { sql } from "@vercel/postgres";

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }

    if (req.headers.authorization !== process.env.API_KEY) return res.status(401).json({ status: 401, error: "Unauthorized" });

    try {
        let { username, userid, avatar_url } = req.body;

        if (!username || !userid) return res.status(400).json({ status: 400, error: "Missing required parameters" });
        if (!avatar_url) avatar_url = "https://cdn.discordapp.com/embed/avatars/0.png";
        await sql`INSERT INTO contributors (username, userid, avatar_url) VALUES (${username}, ${userid}, ${avatar_url});`;
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
    return res.status(200).json({ status: 200, error: "" });
}