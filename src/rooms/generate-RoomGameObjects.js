const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const roomsDir = path.resolve(__dirname, "../gamedata/chapter1/rooms");
const outPath = path.join(__dirname, "RoomGameObjects.ts");

const roomDirs = fs.readdirSync(roomsDir).sort();
const result = {};

for (const dir of roomDirs) {
  const jsonPath = path.join(roomsDir, dir, "room.json");
  if (!fs.existsSync(jsonPath)) continue;
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const objectNames = new Set();

  if (data.gameObjects) {
    for (const obj of data.gameObjects) {
      objectNames.add(obj.objectName);
    }
  }
  if (data.layers) {
    for (const layer of data.layers) {
      if (layer.type === "Instances") {
        for (const inst of layer.instances) {
          objectNames.add(inst.objectName);
        }
      }
    }
  }

  result[data.name] = [...objectNames].sort();
}

const sorted = Object.entries(result).sort(([a], [b]) => a.localeCompare(b));

const lines = [];
lines.push("// Generated from src/gamedata/chapter1/rooms/*/room.json");
lines.push(
  "// Re-generate by running: node src/rooms/generate-RoomGameObjects.js",
);
lines.push("export type RoomGameObjects = {");
for (const [room, objects] of sorted) {
  if (objects.length === 0) {
    lines.push("  " + room + ": never;");
  } else {
    const union = objects.map((o) => JSON.stringify(o)).join(" | ");
    lines.push("  " + room + ": " + union + ";");
  }
}
lines.push("};");
lines.push("");

fs.writeFileSync(outPath, lines.join("\n"));
console.log("Wrote", outPath, "with", sorted.length, "rooms");

child_process.spawnSync("npx", ["prettier", "--write", outPath], {
  stdio: "inherit",
});
