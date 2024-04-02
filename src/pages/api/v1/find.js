import Fuse from "fuse.js";
import functionData from "../../assets/data/functions.json";

/**
 * @swagger
 * /api/v1/find:
 *   get:
 *     summary: Search for functions by name
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the function to search for
 *       - in: query
 *         name: list
 *         schema:
 *           type: integer
 *         description: The number of results to return (default is 5)
 *     responses:
 *       200:
 *         description: A list of matching functions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 endpoint:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 functions:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Bad request, name parameter is required
 *       404:
 *         description: No functions found
 */
export default async function find(req, res) {
    const { name, list = 5 } = req.query;
    if (!name) {
        return res.status(400).json({ status: "400", error: "Name parameter is required" });
    }

    const fuseOptions = {
        keys: ["function"],
        includeScore: true,
        threshold: 0.85
    };

    const fuse = new Fuse(functionData, fuseOptions);
    const results = fuse.search(name.replace("$", ""));

    if (results.length === 0) {
        return res.status(404).json({ status: 404, error: "No functions found." });
    }

    const parsedFunctions = results.slice(0, parseInt(list || 5, 10)).map((result) => {
        return result.item.function;
    });

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ endpoint: "/find", status: 200, functions: parsedFunctions }, null, 2));
}
