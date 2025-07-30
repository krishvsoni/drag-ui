"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { FileUpload } from "@/components/file-upload"
import {
  Upload,
  Palette,
  Settings,
  Zap,
  Shield,
  Code,
  ArrowRight,
  CheckCircle,
  Github,
  ExternalLink,
} from "lucide-react"

const features = [
  {
    icon: Upload,
    title: "Drag & Drop",
    description: "Intuitive drag-and-drop interface with keyboard accessibility support",
  },
  {
    icon: Palette,
    title: "6 Color Themes",
    description: "Beautiful gradient themes with real-time switching capabilities",
  },
  {
    icon: Settings,
    title: "JSON Configuration",
    description: "LLM-friendly configuration system for easy customization",
  },
  {
    icon: Zap,
    title: "5 Variants",
    description: "Multiple component styles: dropzone, button, compact, preview, and image",
  },
  {
    icon: Shield,
    title: "Fully Accessible",
    description: "WCAG compliant with screen reader support and keyboard navigation",
  },
  {
    icon: Code,
    title: "TypeScript Ready",
    description: "Built with TypeScript for excellent developer experience",
  },
]

const variants = [
  { name: "Dropzone", description: "Classic drag-and-drop interface" },
  { name: "Button", description: "Simple button-style upload" },
  { name: "Compact", description: "Space-efficient design" },
  { name: "Preview", description: "Full-featured file management" },
  { name: "Image", description: "Optimized for image uploads" },
]

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/20 via-transparent to-cyan-100/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 xl:py-32">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs sm:text-sm px-3 py-1"
              >
                🎉 Now with 6 Color Themes & JSON Config
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Drag UI
                </span>
                <br />
                <span className="text-gray-900">File Upload Components</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                Build beautiful, accessible file upload interfaces with drag-and-drop, multiple themes, and JSON-driven
                configuration. Perfect for modern web applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 w-full sm:w-auto"
                asChild
              >
                <Link href="/demo">
                  Try Demo <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent" asChild>
                <Link href="/docs">
                  Documentation <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mt-12 sm:mt-16 px-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border shadow-xl p-4 sm:p-6 lg:p-8">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">Try it now</h3>
                <FileUpload
                  config={{
                    variant: "dropzone",
                    colorTheme: "emerald",
                    showColorPicker: true,
                    maxFileSize: 10 * 1024 * 1024,
                    acceptedFileTypes: ["image/*", ".pdf", ".doc"],
                    labels: {
                      uploadText: "Drop your files here",
                      dragText: "Drag and drop files or click to browse",
                      browseText: "Choose Files",
                    },
                  }}
                  onFilesChange={(files) => console.log("Files:", files)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Everything you need for file uploads
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Drag UI provides all the features you need to build modern file upload experiences
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-emerald-200 transition-colors bg-gradient-to-br from-white to-gray-50"
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">5 Beautiful Variants</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from multiple component styles to match your design needs
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {variants.map((variant, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-2">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                    {variant.name}
                  </CardTitle>
                  <CardDescription className="text-sm">{variant.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">
                View All Variants <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">JSON-Driven Configuration</h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Configure everything through simple JSON. Perfect for LLMs, CMSs, and dynamic applications.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">LLM-friendly flat structure</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Runtime configuration changes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Style presets and themes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Custom labels and text</span>
                </div>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 w-full sm:w-auto" asChild>
                <Link href="/demo">
                  Try JSON Editor <Code className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-green-400 font-mono text-xs sm:text-sm overflow-x-auto order-1 lg:order-2">
              <pre className="whitespace-pre-wrap break-all sm:break-normal">{`{
  "variant": "dropzone",
  "colorTheme": "emerald",
  "size": "md",
  "radius": "lg",
  "maxFileSize": 10485760,
  "maxFiles": 5,
  "acceptedFileTypes": [
    "image/*", 
    ".pdf", 
    ".doc"
  ],
  "labels": {
    "uploadText": "Drop files here",
    "dragText": "Drag and drop files",
    "browseText": "Browse Files"
  },
  "showProgress": true,
  "showPreview": true,
  "showColorPicker": true
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 sm:space-y-8 text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Ready to get started?</h2>
            <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto">
              Install Drag UI and start building beautiful file upload experiences in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                <Link href="/demo">
                  Try Demo <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent w-full sm:w-auto"
                asChild
              >
                <Link href="https://github.com/your-org/drag-ui" target="_blank">
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 sm:py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Upload className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold">Drag UI</span>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Link href="/demo" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                Demo
              </Link>
              <Link href="/docs" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                Docs
              </Link>
              <Link
                href="https://github.com/krishvsoni/drag-ui"
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                GitHub
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Drag UI. Built with ❤️ for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
