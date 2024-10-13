import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'
type Props = {
  children?: ReactNode
  title: ReactNode
}

/**
 * A layout component for pages, providing a standard header and footer.
 *
 * @prop {ReactNode} children The content of the page.
 * @prop {ReactNode} title The title of the page.
 *
 * @example
 * <PageLayout title="My Page">
 *   <p>This is the content of the page.</p>
 * </PageLayout>
 */
const PageLayout: React.FC<Props> = ({ children, title }: Props): JSX.Element => {
  return (
    <main className="h-full min-h-screen w-full">
      <div className="bg-[url('/images/signin-bg.jpg')]">{children}</div>
    </main>
  )
}

export default PageLayout
