import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export default function Portal({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const t = useTranslations('Portal')

  return (
    <div>
      {t.rich('title', {
        p: (chunks) => <p className="mt-4">{chunks}</p>,
        code: (chunks) => <code className="font-mono text-white">{chunks}</code>,
      })}
    </div>
  )
}
