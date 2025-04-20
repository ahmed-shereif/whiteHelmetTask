const fs = require("fs");
const path = require("path");

// Specify the icons directory and output file
const iconsDir = path.join(__dirname, "src/assets/icons"); // Adjust this path if necessary
const outputPath = path.join(__dirname, "src/app/shared/services/icons-service/icons-names-paths.ts");

// Read the directory
fs.readdir(iconsDir, (err, files) => {
  if (err) {
    console.error("Error reading icons directory:", err);
    return;
  }

  // Filter SVG files and create an array of icon objects
  const icons = files
    .filter((file) => file.endsWith(".svg"))
    .map((file) => ({
      name: path.basename(file, ".svg"),
      path: `assets/icons/${file}`,
    }));

  // Create TypeScript content with a TypeScript object
  const tsContent = `
    type IconsConfig = {
    name: string;
    path: string;
};

export const  iconsArray: IconsConfig[]= [
    ${icons
      .map(
        (icon) => `{
        name: '${icon.name}',
        path: '${icon.path}'
    }`
      )
      .join(",\n    ")}
];
`;

  // Write to icons.ts
  fs.writeFileSync(outputPath, tsContent, { encoding: "utf8" });
  console.log("Icons list generated in icons.ts:", icons);
});
