import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Sidebar } from './sidebar'

/**
 * A mobile version of the sidebar, displayed as a sheet.
 *
 * On mobile devices, this component is used to display the sidebar as a sheet.
 * It is displayed by clicking on the menu button in the top left corner of the app.
 *
 * In this component, the sidebar is wrapped in a `Sheet` component.
 * The `Sheet` component is a component from the `@radix-ui/react-sheet` library.
 * It is used to display a sheet of content that can be opened and closed.
 *
 * The sidebar is displayed on the left side of the screen.
 * The `side` prop is set to `'left'` to ensure that the sidebar is displayed on the left side of the screen.
 *
 * The `zIndex` prop is set to `100` to ensure that the sidebar is displayed on top of other elements.
 *
 * The `padding` prop is set to `0` to ensure that the sidebar is displayed without any padding.
 *
 * The `className` prop is set to `'z-[100] p-0'` to ensure that the sidebar is displayed without any padding.
 */
export const MobileSidebar: React.FC = (): JSX.Element => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>

      <SheetContent className="z-[100] p-0" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
