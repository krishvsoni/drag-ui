const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Clean dist directory
console.log('Cleaning dist directory...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}
fs.mkdirSync('dist');

// Copy required files for bundling
console.log('Preparing files for build...');
const tempDir = path.join('dist', 'temp');
fs.mkdirSync(tempDir, { recursive: true });

// Copy source files with resolved paths
const copyFileWithResolvedPaths = (srcPath, destPath) => {
  const content = fs.readFileSync(srcPath, 'utf8');
  
  // Calculate the relative path from the destination to the required modules
  const destDir = path.dirname(destPath);
  const relativePath = path.relative(destDir, tempDir);
  
  // Replace path aliases with relative paths based on file location
  let resolvedContent = content;
  
  if (srcPath.includes('components/file-upload')) {
    resolvedContent = resolvedContent
      .replace(/from "@\/lib\/utils"/g, 'from "../../lib/utils"')
      .replace(/from "@\/components\/ui\/button"/g, 'from "../ui/button"')
      .replace(/from "@\/components\/ui\/progress"/g, 'from "../ui/progress"')
      .replace(/import { cn } from "@\/lib\/utils"/g, 'import { cn } from "../../lib/utils"')
      .replace(/import { Button } from "@\/components\/ui\/button"/g, 'import { Button } from "../ui/button"')
      .replace(/import { Progress } from "@\/components\/ui\/progress"/g, 'import { Progress } from "../ui/progress"');
  } else if (srcPath.includes('components/ui')) {
    resolvedContent = resolvedContent
      .replace(/from "@\/lib\/utils"/g, 'from "../../lib/utils"')
      .replace(/import { cn } from "@\/lib\/utils"/g, 'import { cn } from "../../lib/utils"');
  } else if (srcPath === 'src/index.ts') {
    resolvedContent = resolvedContent
      .replace(/from '\.\.\/components\/file-upload'/g, 'from "../components/file-upload"')
      .replace(/from "\.\.\/components\/file-upload"/g, 'from "../components/file-upload"');
  }
  
  const destDirPath = path.dirname(destPath);
  fs.mkdirSync(destDirPath, { recursive: true });
  fs.writeFileSync(destPath, resolvedContent);
};

// Copy and resolve src/index.ts
copyFileWithResolvedPaths('src/index.ts', path.join(tempDir, 'src', 'index.ts'));

// Copy file-upload component
const fileUploadFiles = [
  'components/file-upload/index.tsx',
  'components/file-upload/variants/index.tsx',
  'components/file-upload/variants/button.tsx',
  'components/file-upload/variants/compact.tsx',
  'components/file-upload/variants/dropzone.tsx',
  'components/file-upload/variants/image.tsx',
  'components/file-upload/variants/preview.tsx'
];

fileUploadFiles.forEach(file => {
  if (fs.existsSync(file)) {
    copyFileWithResolvedPaths(file, path.join(tempDir, file));
  }
});

// Copy utilities and UI components
const utilFiles = [
  'lib/utils.ts',
  'components/ui/button.tsx',
  'components/ui/progress.tsx'
];

utilFiles.forEach(file => {
  if (fs.existsSync(file)) {
    copyFileWithResolvedPaths(file, path.join(tempDir, file));
  }
});

// Build with TypeScript using temp directory
console.log('Building with TypeScript...');
try {
  // Create a temporary tsconfig for building
  const tempTsConfig = {
    "compilerOptions": {
      "outDir": "../",
      "declaration": true,
      "declarationMap": true,
      "sourceMap": true,
      "removeComments": false,
      "noEmit": false,
      "module": "ESNext",
      "target": "ES2020",
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "allowSyntheticDefaultImports": true,
      "esModuleInterop": true,
      "jsx": "react-jsx",
      "skipLibCheck": true,
      "strict": false,
      "moduleResolution": "node"
    },
    "include": ["**/*"],
    "exclude": []
  };
  
  fs.writeFileSync(path.join(tempDir, 'tsconfig.json'), JSON.stringify(tempTsConfig, null, 2));
  
  execSync(`cd "${tempDir}" && npx tsc`, { stdio: 'inherit' });
} catch (error) {
  console.error('TypeScript build failed:', error.message);
  process.exit(1);
}

// Clean up temp directory
fs.rmSync(tempDir, { recursive: true });

// Move files from dist/src to dist root
console.log('Moving files to dist root...');
const srcDistPath = path.join('dist', 'src');
if (fs.existsSync(srcDistPath)) {
  const files = fs.readdirSync(srcDistPath);
  files.forEach(file => {
    fs.copyFileSync(
      path.join(srcDistPath, file),
      path.join('dist', file)
    );
  });
  // Remove the src directory
  fs.rmSync(srcDistPath, { recursive: true });
}

// Fix import paths in the moved index.js file
console.log('Fixing import paths...');
const indexJsPath = path.join('dist', 'index.js');
if (fs.existsSync(indexJsPath)) {
  const content = fs.readFileSync(indexJsPath, 'utf8');
  const fixedContent = content.replace(/from "\.\.\/components\//g, 'from "./components/');
  fs.writeFileSync(indexJsPath, fixedContent);
}

// Add "use client" directive to the main file
console.log('Adding client directive...');
const indexPath = path.join('dist', 'index.js');
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8');
  fs.writeFileSync(indexPath, '"use client";\n' + content);
}

console.log('Build completed successfully!');