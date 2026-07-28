const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const dirPath = path.join(dir, f);
    const stat = fs.statSync(dirPath);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist' && f !== 'build' && f !== 'target') {
        walkDir(dirPath, callback);
      }
    } else {
      if (f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.java')) {
        callback(dirPath);
      }
    }
  }
}

const rootDir = process.cwd();

function stripComments(code) {
  
  
  let stripped = code.replace(/\/\*[\s\S]*?\*\//g, '');
  stripped = stripped.replace(/([^\\:]|^)\/\/.*$/gm, '$1');
  return stripped;
}

walkDir(rootDir, (filePath) => {
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    if (code.includes('//') || code.includes('/*')) {
      const stripped = stripComments(code);
      if (stripped !== code) {
        fs.writeFileSync(filePath, stripped, 'utf8');
        console.log(`Cleaned: ${filePath}`);
      }
    }
  } catch (err) {
    console.error(`Skipping ${filePath}: ${err.message}`);
  }
});
