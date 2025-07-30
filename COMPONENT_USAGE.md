# @drag-ui/file-upload Component Usage Guide

## Installation

```bash
npm install @drag-ui/file-upload
```

## Component Variants

### 1. FileUploadDropzone
Classic drag-and-drop interface with large drop area.

```typescript
import { FileUploadDropzone } from '@drag-ui/file-upload';

function MyApp() {
  return (
    <FileUploadDropzone
      config={{
        colorTheme: "emerald",
        maxFileSize: 10 * 1024 * 1024,
        acceptedFileTypes: ["image/*", ".pdf"]
      }}
      onFilesChange={(files) => console.log(files)}
    />
  );
}
```

### 2. FileUploadButton
Simple button-style upload for minimal interfaces.

```typescript
import { FileUploadButton } from '@drag-ui/file-upload';

function MyApp() {
  return (
    <FileUploadButton
      config={{
        colorTheme: "blue",
        size: "sm",
        labels: { uploadText: "Choose File" }
      }}
      onFilesChange={(files) => console.log(files)}
    />
  );
}
```

### 3. FileUploadCompact
Space-efficient horizontal layout perfect for forms.

```typescript
import { FileUploadCompact } from '@drag-ui/file-upload';

function MyApp() {
  return (
    <FileUploadCompact
      config={{
        colorTheme: "slate",
        maxFiles: 3,
        showProgress: true
      }}
      onFilesChange={(files) => console.log(files)}
    />
  );
}
```

### 4. FileUploadPreview
Full-featured interface with detailed file management.

```typescript
import { FileUploadPreview } from '@drag-ui/file-upload';

function MyApp() {
  return (
    <FileUploadPreview
      config={{
        colorTheme: "purple",
        maxFileSize: 50 * 1024 * 1024,
        showPreview: true,
        showProgress: true
      }}
      onFilesChange={(files) => console.log(files)}
    />
  );
}
```

### 5. FileUploadImage
Optimized for image uploads with thumbnail previews.

```typescript
import { FileUploadImage } from '@drag-ui/file-upload';

function MyApp() {
  return (
    <FileUploadImage
      config={{
        colorTheme: "rose",
        acceptedFileTypes: ["image/jpeg", "image/png", "image/webp"],
        maxFiles: 10
      }}
      onFilesChange={(files) => console.log(files)}
    />
  );
}
```

## Generic Component
Use the base component with variant prop for dynamic switching.

```javascript
import { FileUpload } from '@drag-ui/file-upload';
import { useState } from 'react';

function MyApp() {
  const [variant, setVariant] = useState('dropzone');
  
  return (
    <FileUpload
      variant={variant}
      config={{
        colorTheme: "emerald",
        showColorPicker: true
      }}
      onFilesChange={(files) => console.log(files)}
    />
  );
}
```

## Configuration Presets

```javascript
import { dragUIConfig } from '@drag-ui/file-upload/config';
import { FileUploadDropzone } from '@drag-ui/file-upload';

function MyApp() {
  return (
    <FileUploadDropzone
      config={dragUIConfig.presets.imageGallery}
      onFilesChange={(files) => console.log(files)}
    />
  );
}
```

## Available Presets
- `minimal` - Simple button upload
- `standard` - Default dropzone with all features
- `advanced` - Full-featured preview with large file support
- `imageGallery` - Optimized for image collections
- `documentUpload` - Compact design for documents

## Color Themes
- `emerald` - Fresh green theme
- `blue` - Classic professional blue
- `purple` - Creative purple theme
- `orange` - Energetic orange theme
- `rose` - Elegant rose theme
- `slate` - Neutral professional theme

## TypeScript Support

All components are fully typed with TypeScript:

```javacript
import { 
  FileUploadDropzone, 
  FileUploadConfig,
  FileUploadDropzoneProps 
} from '@drag-ui/file-upload';

const config: FileUploadConfig = {
  variant: "dropzone",
  colorTheme: "emerald",
  maxFileSize: 10 * 1024 * 1024,
  acceptedFileTypes: ["image/*"]
};

const MyComponent: React.FC<FileUploadDropzoneProps> = (props) => {
  return <FileUploadDropzone {...props} />;
};
```
