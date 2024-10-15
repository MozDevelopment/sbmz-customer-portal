'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

// Define a single styles object for all classes
const styles = {
  container:
    'absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center',
  errorNumber:
    'bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent',
  errorMessage: 'font-heading my-2 text-2xl font-bold',
  description: 'mb-8',
  buttonContainer: 'flex justify-center gap-2',
}

const NotFound: React.FC = () => {
  const router = useRouter()
  const t = useTranslations('NotFoundPage')

  return (
    <div className={styles.container}>
      <span className={styles.errorNumber}>404</span>
      <h2 className={styles.errorMessage}>{t('title')}</h2>
      <p className={styles.description}>{t('description')}</p>
      <div className={styles.buttonContainer}>
        <Button onClick={() => router.back()} variant="default" size="lg">
          {t('goBack')}
        </Button>
        <Button onClick={() => router.push('/dashboard')} variant="ghost" size="lg">
          {t('backToHome')}
        </Button>
      </div>
    </div>
  )
}

export default NotFound
