'use client'

import { useRouter } from 'next/navigation'
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

/**
 * Page rendered when the user navigates to a non-existent page.
 *
 * It displays a 404 error message and provides a "Go back" button to go back to the previous page
 * and a "Back to Home" button to go back to the dashboard.
 */
const NotFound: React.FC = (): JSX.Element => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <span className={styles.errorNumber}>404</span>
      <h2 className={styles.errorMessage}>Something&apos;s missing</h2>
      <p className={styles.description}>
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className={styles.buttonContainer}>
        <Button onClick={() => router.back()} variant="default" size="lg">
          Go back
        </Button>
        <Button onClick={() => router.push('/dashboard')} variant="ghost" size="lg">
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound
