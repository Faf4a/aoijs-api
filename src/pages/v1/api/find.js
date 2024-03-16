import Fuse from "fuse.js";
import functionData from "../data/functions.json";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ status: 405, error: "Method not allowed" });
  }

  const { name, list = 5 } = req.query;
  if (!name) {
    return res.status(400).json({ status: 400, error: "Name parameter is required" });
  }

  const fuseOptions = {
    keys: ["function"],
    includeScore: true,
    threshold: 0.85,
  };

  const fuse = new Fuse(functionData, fuseOptions);
  const results = fuse.search(name.replace("$", ""));

  if (results.length === 0) {
    return res.status(404).json({ status: 404, error: "No functions found." });
  }

  const parsedFunctions = results
    .slice(0, parseInt(list || 5, 10))
    .map((result) => {
      return result.item.function;
    });


  const data = {
    endpoint: "/find",
    status: 200,
    params: {
      name,
      list,
    },
  }

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ data, functions: parsedFunctions }, null , 2));
}
