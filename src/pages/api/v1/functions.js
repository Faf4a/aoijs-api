import Fuse from "fuse.js";
import functionData from "../../assets/data/functions.json";

/**
 * @swagger
 * /api/v1/functions:
 *   get:
 *     summary: Search for a specific function by name
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the function to search for
 *     responses:
 *       200:
 *         description: The matching function
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 endpoint:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     function:
 *                       type: string
 *                     description:
 *                       type: string
 *                     example:
 *                       type: string
 *       400:
 *         description: Bad request, name parameter is required
 *       404:
 *         description: Function not found
 */
export default async function functions(req, res) {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ status: "400", error: "Name parameter is required" });
    }

    const exactMatch = functionData.find(func => func.function.toLowerCase() === name.toLowerCase());
    if (exactMatch) {
        const json = JSON.stringify({ endpoint: "/functions", status: 200, data: exactMatch }, null, 2);
        res.setHeader("Content-Type", "application/json");
        res.end(json);
        return;
    }

    const fuseOptions = {
        keys: ["function"],
        includeScore: true,
        threshold: 0.1
    };

    const fuse = new Fuse(functionData, fuseOptions);
    const result = fuse.search(name.replace("$", ""));

    if (result.length === 0) {
        res.setHeader("Content-Type", "application/json");
        return res.status(404).json({ status: 404, error: "Function not found." });
    }

    const json = JSON.stringify({ endpoint: "/functions", status: 200, data: result[0].item }, null, 2);
    res.setHeader("Content-Type", "application/json");
    res.end(json);
}