import { FileUploadDemo } from "@/components/demo/file-upload-demo"
import { Navbar } from "@/components/layout/navbar"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/20 via-transparent to-cyan-100/20" />
      <div className="relative">
        <Navbar />
        <FileUploadDemo />
      </div>
    </div>
  )
}
