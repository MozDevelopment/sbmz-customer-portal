import { MobileSidebar } from './mobile-sidebar'

/**
 * The MobileHeader component renders the header section of the page for mobile devices.
 * It is always fixed at the top of the page and contains a mobile sidebar component.
 *
 * @returns {JSX.Element} The rendered MobileHeader component.
 */
export const MobileHeader: React.FC = (): JSX.Element => {
  return (
    <nav className="fixed top-0 z-50 flex h-[50px] w-full items-center border-b bg-blue-600 px-4 lg:hidden">
      <MobileSidebar />
    </nav>
  )
}
