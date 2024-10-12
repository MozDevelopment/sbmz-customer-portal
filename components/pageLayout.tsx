import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
type Props = {
  children?: ReactNode
  title: ReactNode
}

const PageLayout = ({ children, title }: Props) => {
  const t = useTranslations('PageLayout')

  return (
    <main className="h-full min-h-screen w-full">
      <div className="bg-[url('/images/signin-bg.jpg')]">{children}</div>
    </main>
  )
}

export default PageLayout
