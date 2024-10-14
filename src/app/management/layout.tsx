
import DashboardPanelLayout from '@/core/layout/content/dashboard-layout'

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardPanelLayout>
      <div>{children}</div>
    </DashboardPanelLayout>
  )
}
