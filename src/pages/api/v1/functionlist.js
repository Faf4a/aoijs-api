import functionData from "../../assets/data/functions.json";
/**
 * @swagger
 * /api/v1/functionlist:
 *   get:
 *     summary: Get a list of all functions available in aoi.js
 *     parameters:
 *        none
 *     responses:
 *       200:
 *         description: All functions were sent
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
 *                   type: array
 */

export default async function functionlist(req, res) {
    var arr = [];
    for (var i = 0; i < functionData.length; i++) {
    	arr[i]= "$" + functionData[i].function;
    }
    
    const json = JSON.stringify({ endpoint: "/functionlist", status: 200, data: [...arr] }, null, 2);
    res.setHeader("Content-Type", "application/json");
    res.end(json);
}
