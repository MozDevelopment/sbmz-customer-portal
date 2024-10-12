import PageLayout from '@/components/pageLayout'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return <PageLayout title={'Portal'}>{children}</PageLayout>
}
