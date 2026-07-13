const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /\bbg-white\b/g, replacement: 'bg-surface' },
  { regex: /\bbg-gray-50\b/g, replacement: 'bg-surface-variant/20' },
  { regex: /\bbg-gray-100\b/g, replacement: 'bg-surface-variant/30' },
  { regex: /\bbg-gray-200\b/g, replacement: 'bg-surface-variant/50' },
  { regex: /\btext-gray-900\b/g, replacement: 'text-on-surface' },
  { regex: /\btext-gray-800\b/g, replacement: 'text-on-surface' },
  { regex: /\btext-gray-700\b/g, replacement: 'text-on-surface' },
  { regex: /\btext-gray-600\b/g, replacement: 'text-on-surface-variant' },
  { regex: /\btext-gray-500\b/g, replacement: 'text-on-surface-variant' },
  { regex: /\btext-gray-400\b/g, replacement: 'text-on-surface-variant/70' },
  { regex: /\bborder-gray-100\b/g, replacement: 'border-outline-variant/20' },
  { regex: /\bborder-gray-200\b/g, replacement: 'border-outline-variant/30' },
  { regex: /\bborder-gray-300\b/g, replacement: 'border-outline-variant/50' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));
console.log("Done refactoring colors!");
