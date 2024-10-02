import { cn } from '@/lib/utils'

import { SidebarItem } from './sidebar-item'

type SidebarProps = {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        'left-0 top-48 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]',
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem label="Self Service" href="/selfservice" iconSrc="/service-req.svg" />

        <SidebarItem
          label="Internet Banking"
          href="/internetbanking"
          iconSrc="/internet-banking.svg"
        />
      </div>
      <div className="p-4"></div>
    </div>
  )
}
