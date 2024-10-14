'use client'

import { useSidebarToggle } from '@/core/hooks/use-sidebar-toggle'
import { useStore } from '@/core/hooks/use-store'

import { cn } from '@/lib/utils'

import { Sidebar } from '../dashboard/sidebar/sidebar'

export default function DashboardPanelLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)]  transition-[margin-left] duration-300 ease-in-out ',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}
      >
        {children}
      </main>
    </>
  )
}
