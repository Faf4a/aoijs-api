import Fuse from "fuse.js";
import functionData from "./data/functions.json";

export default async function functions(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ status: "405", error: "Method not allowed" });
  }

  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ status: "400", error: "Name parameter is required" });
  }

  const fuseOptions = {
    keys: ["function"],
    includeScore: true,
    threshold: 0.1,
  };

  const fuse = new Fuse(functionData, fuseOptions);
  const result = fuse.search(name.replace("$", ""));

  if (result.length === 0) {
    return res.status(404).json({ status: "404", error: "Function not found." });
  }

  const json = JSON.stringify({ endpoint: "/functions", status: 200, data: result[0].item }, null, 2);
  res.setHeader("Content-Type", "application/json");
  res.end(json);
}
