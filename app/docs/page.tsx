import { Navbar } from "@/components/layout/navbar"
import { DocsPage } from "@/components/docs/docs-page"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/20 via-transparent to-zinc-100/20" />
      <div className="relative">
        <Navbar />
        <DocsPage />
      </div>
    </div>
  )
}
