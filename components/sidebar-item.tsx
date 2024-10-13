'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

type SidebarItemProps = {
  label: string
  iconSrc: string
  href: string
}

/**
 * A component for rendering a single item in the sidebar.
 *
 * @param {string} label The label for the sidebar item.
 * @param {string} iconSrc The source URL of the icon for the sidebar item.
 * @param {string} href The link to navigate when the sidebar item is clicked.
 * @returns {JSX.Element} A rendered sidebar item.
 */
export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  iconSrc,
  href,
}: SidebarItemProps): JSX.Element => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button
      variant={isActive ? 'sidebarOutline' : 'sidebar'}
      className="h-[52px] justify-start"
      asChild
    >
      <Link href={href}>
        <Image src={iconSrc} alt={label} className="mr-5 text-lg" height={32} width={32} />
        <p> {label}</p>
      </Link>
    </Button>
  )
}
