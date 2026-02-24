import { parse } from "@babel/parser";
import fs from "fs";

const code = fs.readFileSync("./src/components/home/PortfolioSection.js", "utf8");
try {
  parse(code, { sourceType: "module", plugins: ["jsx"] });
  console.log("Syntax OK");
} catch (e) {
  console.error("Syntax Error", e);
}
