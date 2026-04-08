const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const spritesDir = path.resolve(__dirname, "../gamedata/chapter1/sprites");
const outPath = path.join(__dirname, "GameObjectDimensions.ts");

const files = fs
  .readdirSync(spritesDir)
  .filter((f) => f.endsWith(".png"))
  .sort();

const entries = [];
for (const file of files) {
  const name = path.basename(file, ".png");
  const filePath = path.join(spritesDir, file);
  const result = child_process
    .execSync(`identify -format '%w %h' ${JSON.stringify(filePath)}`)
    .toString()
    .trim();
  const [w, h] = result.split(" ").map(Number);
  entries.push({ name, w, h });
}

const lines = [];
lines.push("// Generated from src/gamedata/chapter1/sprites/*.png");
lines.push(
  "// Re-generate by running: node src/objects/generate-GameObjectDimensions.js",
);
lines.push('import { Vector } from "@hex-engine/2d";');
lines.push("");
lines.push(
  "export const GameObjectDimensions: Record<string, Vector> = {",
);
for (const { name, w, h } of entries) {
  lines.push(`  ${JSON.stringify(name)}: new Vector(${w}, ${h}),`);
}
lines.push("};");
lines.push("");

fs.writeFileSync(outPath, lines.join("\n"));
console.log("Wrote", outPath, "with", entries.length, "entries");

child_process.spawnSync("npx", ["prettier", "--write", outPath], {
  stdio: "inherit",
});
