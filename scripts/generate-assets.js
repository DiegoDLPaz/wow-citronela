const fs   = require('fs');
const path = require('path');

// 1) Paths
const OUT_FILE   = path.join(__dirname, '..', 'src', 'app', 'assets-map.ts');
const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets');

// 2) Categories to scan
const categories = [
  { key: 'backgrounds', folder: 'tree-backgrounds' },
  { key: 'icons',       folder: 'icons'             },
];

// 3) Start building the TS output
let fileContent =
  `// AUTO‐GENERATED — do not edit by hand\n\n` +
  `export interface AssetGroup { [key: string]: string }\n\n`;

for (const { key, folder } of categories) {
  fileContent += `export const ${key}: Record<string, AssetGroup> = {\n`;

  // each class folder under that category
  const classDirs = fs.readdirSync(path.join(ASSETS_DIR, folder))
    .filter(name => fs.statSync(path.join(ASSETS_DIR, folder, name)).isDirectory());

  for (const cls of classDirs) {
    fileContent += `  "${cls}": {\n`;
    const imgs = fs.readdirSync(path.join(ASSETS_DIR, folder, cls))
      .filter(f => /\.(png|jpe?g|svg)$/.test(f));

    for (const img of imgs) {
      const name = img.replace(/\.[^.]+$/, '');           // strip extension
      const rel  = `assets/${folder}/${cls}/${img}`;      // relative path in built app
      fileContent += `    "${name}": "${rel}",\n`;
    }

    fileContent += `  },\n`;
  }

  fileContent += `};\n\n`;
}

// 4) Write the file
fs.writeFileSync(OUT_FILE, fileContent, 'utf8');
console.log(`✅ Generated ${OUT_FILE}`);
