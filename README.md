# Drag UI - File Upload Component Library


  
  <p>A highly customizable, accessible, and config-driven file upload component library built with React, TypeScript, and Tailwind CSS.</p>
  
  <p>
    <a href="https://drag-ui.vercel.app">Website</a> •
    <a href="https://drag-ui.vercel.app/docs">Documentation</a> •
    <a href="https://github.com/krishvsoni/drag-ui">GitHub</a>
    <a href="https://www.krishsoni.co">Developer</a>
  </p>
  
  <p>
    <img src="https://img.shields.io/npm/v/@drag-ui/drag-ui" alt="npm version">
    <img src="https://img.shields.io/npm/dm/@drag-ui/drag-ui" alt="npm downloads">
    <img src="https://img.shields.io/github/license/krishvsoni/drag-ui?label=MIT%20license" alt="MIT license">
    <img src="https://img.shields.io/badge/TypeScript-Ready-blue" alt="TypeScript">
  </p>
</div>

## Features

- Beautiful Color Themes - Emerald, Blue, Purple, Orange, Rose, and Slate with gradient backgrounds
- Component Variants - Dropzone, Button, Compact, Preview, and Image-focused layouts
- JSON Configuration - LLM-friendly, declarative configuration system
- Fully Accessible - WCAG compliant with keyboard navigation and screen reader support
- Responsive Design - Mobile-first approach with touch-friendly interfaces
- TypeScript Ready - Complete type safety and excellent developer experience
- Real-time Theme Switching - Change colors instantly with built-in color picker
- Progress Tracking - Visual upload progress with customizable indicators
- Image Previews - Automatic image thumbnails with proper memory management
- Internationalization - Multi-language support with customizable labels

## Quick Start

### Installation

```bash
npm install @drag-ui/drag-ui
# or
yarn add @drag-ui/drag-ui
# or
pnpm add @drag-ui/drag-ui
```

### Basic Usage

```tsx
import { FileUpload } from '@drag-ui/drag-ui'

function App() {
  const handleFilesChange = (files: File[]) => {
    console.log('Selected files:', files)
  }

  const handleError = (error: string) => {
    console.error('Upload error:', error)
  }

  return (
    <FileUpload
      config={{
        variant: "dropzone",
        colorTheme: "emerald",
        maxFileSize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
        acceptedFileTypes: ["image/*", ".pdf", ".doc", ".docx"],
        showColorPicker: true
      }}
      onFilesChange={handleFilesChange}
      onError={handleError}
    />
  )
}
```

## Component Variants

### 1. Dropzone (Default)
Classic drag-and-drop interface with large drop area and file previews.

```tsx
<FileUpload config={{ variant: "dropzone" }} />
```

### 2. Button
Simple button-style upload for minimal interfaces.

```tsx
<FileUpload config={{ variant: "button" }} />
```

### 3. Compact
Space-efficient horizontal layout perfect for forms.

```tsx
<FileUpload config={{ variant: "compact" }} />
```

### 4. Preview
Full-featured interface with detailed file management.

```tsx
<FileUpload config={{ variant: "preview" }} />
```

### 5. Image
Optimized for image uploads with thumbnail previews.

```tsx
<FileUpload config={{ variant: "image" }} />
```

## Color Themes

Choose from 6 beautiful color themes:

- **Emerald** - Fresh green with nature-inspired gradients
- **Blue** - Classic professional blue theme
- **Purple** - Creative purple with modern gradients
- **Orange** - Energetic orange with warm tones
- **Rose** - Elegant rose with soft pink accents
- **Slate** - Neutral theme for professional interfaces

```tsx
<FileUpload 
  config={{ 
    colorTheme: "purple",
    showColorPicker: true // Allow users to switch themes
  }} 
/>
```

## JSON Configuration

Drag UI uses a simple, flat JSON structure that's perfect for LLMs, CMSs, and dynamic applications:

```json
{
  "variant": "dropzone",
  "colorTheme": "emerald",
  "size": "md",
  "radius": "lg",
  "maxFileSize": 10485760,
  "maxFiles": 5,
  "acceptedFileTypes": ["image/*", ".pdf", ".doc", ".docx"],
  "labels": {
    "uploadText": "Upload your files",
    "dragText": "Drag and drop files here, or click to browse",
    "browseText": "Browse Files",
    "errorText": "Upload failed",
    "successText": "Upload successful"
  },
  "showProgress": true,
  "showPreview": true,
  "showColorPicker": true,
  "disabled": false
}
```

### Configuration Presets

Use pre-built configurations for common scenarios:

```tsx
import { dragUIConfig } from '@drag-ui/drag-ui/config'

// Load a preset
const config = dragUIConfig.presets.imageGallery
<FileUpload config={config} />
```

Available presets:
- `minimal` - Simple button upload
- `standard` - Default dropzone with all features
- `advanced` - Full-featured preview with large file support
- `imageGallery` - Optimized for image collections
- `documentUpload` - Compact design for documents

## API Reference

### FileUploadProps

| Property | Type | Description |
|----------|------|-------------|
| `config` | `FileUploadConfig` | Configuration object |
| `onFilesChange` | `(files: File[]) => void` | Called when files change |
| `onError` | `(error: string) => void` | Called on validation errors |
| `onColorChange` | `(theme: ColorTheme) => void` | Called when theme changes |
| `value` | `File[]` | Controlled file list |
| `className` | `string` | Additional CSS classes |

### FileUploadConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `"dropzone" \| "button" \| "compact" \| "preview" \| "image"` | `"dropzone"` | Component style |
| `colorTheme` | `"emerald" \| "blue" \| "purple" \| "orange" \| "rose" \| "slate"` | `"emerald"` | Color theme |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Component size |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"lg"` | Border radius |
| `maxFileSize` | `number` | `10485760` (10MB) | Max file size in bytes |
| `maxFiles` | `number` | `5` | Maximum number of files |
| `acceptedFileTypes` | `string[]` | `["image/*", ".pdf"]` | Accepted file types |
| `showProgress` | `boolean` | `true` | Show upload progress |
| `showPreview` | `boolean` | `true` | Show file previews |
| `showColorPicker` | `boolean` | `true` | Show theme picker |
| `disabled` | `boolean` | `false` | Disable component |

## Accessibility

Drag UI is built with accessibility as a first-class citizen:

- Keyboard Navigation - Full keyboard support with Tab, Enter, and Space
- Screen Reader Support - Proper ARIA labels and descriptions
- Focus Management - Clear focus indicators and logical tab order
- Error Handling - Accessible error messages and validation feedback
- High Contrast - Themes work with high contrast mode
- Reduced Motion - Respects user's motion preferences

## Internationalization

Customize labels for different languages:

```tsx
<FileUpload
  config={{
    labels: {
      uploadText: "Subir archivos",
      dragText: "Arrastra y suelta archivos aquí",
      browseText: "Explorar Archivos",
      errorText: "Error en la subida",
      successText: "Subida exitosa"
    }
  }}
/>
```

## Use Cases

- Image Galleries - Perfect for photo uploads with previews
- Document Management - Handle PDFs, Word docs, and more
- Form Integration - Compact variants for form fields
- Content Management - Full-featured preview for CMS systems
- E-commerce - Product image uploads with validation
- Social Media - Media uploads with progress tracking

## Development

### Local Development

```bash
git clone https://github.com/krishvsoni/drag-ui.git
cd drag-ui
npm install
npm run dev
```

### Building

```bash
npm run build
npm run pack
```

### Testing

```bash
npm run test
npm run test:coverage
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Krish Soni](https://github.com/krishvsoni)

## Acknowledgments

- [Radix UI](https://radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for styling system
- [Lucide React](https://lucide.dev/) for beautiful icons
- [shadcn/ui](https://ui.shadcn.com/) for design inspiration

---
```javascript
<div align="center">
  <p>Built with love for developers who care about accessibility and user experience.</p>
  <p>
    <a href="https://drag-ui.vercel.app">Website</a> •
    <a href="https://drag-ui.vercel.app">Try Demo</a> •
    <a href="https://twitter.com/krishvsoni">Follow Updates</a>
  </p>
</div>
```