"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Copy, Check } from "lucide-react"

export function DocsPage() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const installCode = "npm install @drag-ui/drag-ui"
  const basicUsageCode = `import { FileUpload } from '@drag-ui/drag-ui'

function App() {
  return (
    <FileUpload
      config={{
        variant: "dropzone",
        colorTheme: "emerald",
        maxFileSize: 10 * 1024 * 1024,
        acceptedFileTypes: ["image/*", ".pdf"]
      }}
      onFilesChange={(files) => console.log(files)}
    />
  )
}`

  const jsonConfigCode = `{
  "variant": "dropzone",
  "colorTheme": "emerald",
  "size": "md",
  "radius": "lg",
  "maxFileSize": 10485760,
  "maxFiles": 5,
  "acceptedFileTypes": ["image/*", ".pdf", ".doc", ".docx"],
  "labels": {
    "uploadText": "Upload your files",
    "dragText": "Drag and drop files here",
    "browseText": "Browse Files",
    "errorText": "Upload failed",
    "successText": "Upload successful"
  },
  "showProgress": true,
  "showPreview": true,
  "showColorPicker": true,
  "disabled": false
}`

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          Complete guide to using Drag UI file upload components in your projects
        </p>
        <div className="flex justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/demo">
              Try Live Demo <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="installation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto">
          <TabsTrigger value="installation" className="text-xs sm:text-sm px-2 py-2">
            Installation
          </TabsTrigger>
          <TabsTrigger value="usage" className="text-xs sm:text-sm px-2 py-2">
            Usage
          </TabsTrigger>
          <TabsTrigger value="configuration" className="text-xs sm:text-sm px-2 py-2">
            Configuration
          </TabsTrigger>
          <TabsTrigger value="variants" className="text-xs sm:text-sm px-2 py-2">
            Variants
          </TabsTrigger>
          <TabsTrigger value="api" className="text-xs sm:text-sm px-2 py-2">
            API Reference
          </TabsTrigger>
        </TabsList>

        <TabsContent value="installation" className="space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Installation</CardTitle>
              <CardDescription className="text-sm">Get started with Drag UI in your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div className="relative">
                <div className="bg-gray-900 rounded-lg p-3 sm:p-4 text-green-400 font-mono text-xs sm:text-sm overflow-x-auto">
                  <code>{installCode}</code>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 bg-transparent p-1 sm:p-2"
                  onClick={() => copyToClipboard(installCode, "install")}
                >
                  {copiedCode === "install" ? (
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Drag UI requires React 18+ and includes all necessary dependencies including Radix UI primitives and
                Tailwind CSS classes.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Usage</CardTitle>
              <CardDescription>Simple example to get you started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                  <pre>{basicUsageCode}</pre>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 bg-transparent"
                  onClick={() => copyToClipboard(basicUsageCode, "basic")}
                >
                  {copiedCode === "basic" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Handlers</CardTitle>
              <CardDescription>Handle file uploads and errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">onFilesChange</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Called when files are selected, uploaded, or removed
                  </p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    onFilesChange: (files: File[]) =&gt; void
                  </code>
                </div>
                <div>
                  <h4 className="font-medium mb-2">onError</h4>
                  <p className="text-sm text-muted-foreground mb-2">Called when validation or upload errors occur</p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">onError: (error: string) =&gt; void</code>
                </div>
                <div>
                  <h4 className="font-medium mb-2">onColorChange</h4>
                  <p className="text-sm text-muted-foreground mb-2">Called when the color theme is changed</p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    onColorChange: (theme: ColorTheme) =&gt; void
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>JSON Configuration</CardTitle>
              <CardDescription>Complete configuration object structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto max-h-96">
                  <pre>{jsonConfigCode}</pre>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 bg-transparent"
                  onClick={() => copyToClipboard(jsonConfigCode, "config")}
                >
                  {copiedCode === "config" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Configuration Properties</CardTitle>
              <CardDescription className="text-sm">Detailed explanation of each configuration option</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium min-w-[100px]">Property</th>
                      <th className="text-left p-2 font-medium min-w-[120px]">Type</th>
                      <th className="text-left p-2 font-medium min-w-[80px]">Default</th>
                      <th className="text-left p-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="p-2 font-mono">variant</td>
                      <td className="p-2 text-xs">"dropzone" | "button" | "compact" | "preview" | "image"</td>
                      <td className="p-2">"dropzone"</td>
                      <td className="p-2">Visual style of the component</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">colorTheme</td>
                      <td className="p-2">"emerald" | "blue" | "purple" | "orange" | "rose" | "slate"</td>
                      <td className="p-2">"emerald"</td>
                      <td className="p-2">Color theme with gradients</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">maxFileSize</td>
                      <td className="p-2">number</td>
                      <td className="p-2">10485760 (10MB)</td>
                      <td className="p-2">Maximum file size in bytes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">maxFiles</td>
                      <td className="p-2">number</td>
                      <td className="p-2">5</td>
                      <td className="p-2">Maximum number of files</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">acceptedFileTypes</td>
                      <td className="p-2">string[]</td>
                      <td className="p-2">["image/*", ".pdf"]</td>
                      <td className="p-2">Accepted file types and extensions</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">showColorPicker</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">true</td>
                      <td className="p-2">Show color theme picker</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="space-y-6">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Dropzone</CardTitle>
                <CardDescription className="text-sm">Classic drag-and-drop interface</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <Badge variant="secondary" className="text-xs">
                  Default
                </Badge>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  Large drop area with drag-and-drop support, file preview, and progress indicators.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Button</CardTitle>
                <CardDescription className="text-sm">Simple button-style upload</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <Badge variant="outline" className="text-xs">
                  Compact
                </Badge>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  Minimal button interface, perfect for single file uploads or space-constrained layouts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Compact</CardTitle>
                <CardDescription className="text-sm">Space-efficient design</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <Badge variant="outline" className="text-xs">
                  Form-friendly
                </Badge>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  Horizontal layout with browse button and status text, ideal for forms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Preview</CardTitle>
                <CardDescription className="text-sm">Full-featured file management</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <Badge variant="secondary" className="text-xs">
                  Advanced
                </Badge>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  Complete file management with detailed previews, progress, and individual file controls.
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Image</CardTitle>
                <CardDescription className="text-sm">Optimized for image uploads</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <Badge variant="outline" className="text-xs">
                  Specialized
                </Badge>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  Image-focused interface with thumbnail previews and image-specific validation.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Props</CardTitle>
              <CardDescription>Complete API reference for the FileUpload component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">FileUploadProps</h4>
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                    <pre>{`interface FileUploadProps {
  config?: FileUploadConfig
  onFilesChange?: (files: File[]) => void
  onError?: (error: string) => void
  onColorChange?: (theme: ColorTheme) => void
  value?: File[]
  className?: string
}`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">FileUploadConfig</h4>
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                    <pre>{`interface FileUploadConfig {
  variant?: "button" | "dropzone" | "compact" | "preview" | "image"
  size?: "sm" | "md" | "lg"
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full"
  colorTheme?: "emerald" | "blue" | "purple" | "orange" | "rose" | "slate"
  maxFileSize?: number
  maxFiles?: number
  acceptedFileTypes?: string[]
  labels?: {
    uploadText?: string
    dragText?: string
    browseText?: string
    errorText?: string
    successText?: string
  }
  showProgress?: boolean
  showPreview?: boolean
  disabled?: boolean
  showColorPicker?: boolean
}`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
