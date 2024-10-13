import { cn } from '@/lib/utils'

import { SidebarItem } from './sidebar-item'

type SidebarProps = {
  className?: string
}
// Define a single styles object for all classes
const styles = {
  container: 'left-0 top-48 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]',
  content: 'flex flex-1 flex-col gap-y-2',
  spacer: 'p-4',
}

// Define the Sidebar component
/**
 * The Sidebar component renders the sidebar for the application.
 *
 * The sidebar is a fixed left column on large screens and a top-down
 * scrolling column on smaller screens. It contains links to the main pages
 * of the application, including Self Service and Internet Banking.
 *
 * The Sidebar component is a convenience wrapper around the SidebarItem
 * component, which renders a single item in the sidebar.
 *
 * @param {string} [className] - The class name to apply to the outermost element.
 * @returns {JSX.Element} The rendered sidebar.
 */
export const Sidebar: React.FC<SidebarProps> = ({ className }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.content}>
        <SidebarItem label="Self Service" href="/selfservice" iconSrc="/service-req.svg" />
        <SidebarItem
          label="Internet Banking"
          href="/internetbanking"
          iconSrc="/internet-banking.svg"
        />
      </div>
      <div className={styles.spacer}></div>
    </div>
  )
}
