import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  title: ReactNode
}

const PageLayout = ({ children, title }: Props) => {
  const t = useTranslations('PageLayout')

  return (
    <main className="h-full border-solid pt-[50px] lg:pl-[256px] lg:pt-0">
      <div className="container">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h1>
        <div className="mt-6 text-gray-400">{children}</div>
      </div>
    </main>
  )
}

export default PageLayout
