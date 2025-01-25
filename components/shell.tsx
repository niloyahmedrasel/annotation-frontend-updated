import { Sidebar } from "@/components/sidebar"

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <Sidebar />
      <div className="flex-1 pl-64">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

