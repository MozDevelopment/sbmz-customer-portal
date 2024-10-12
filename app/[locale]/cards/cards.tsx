import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type ExtraInfo = {
  label: string
  value: string
}

type AccountCard = {
  id: number
  key: string
  extraInfo: ExtraInfo | null
  img: string
}

export default function Cards(): JSX.Element {
  const t = useTranslations('Card')

  const accountCards: AccountCard[] = [
    {
      id: 1,
      key: 'SignatureCard',
      extraInfo: null,
      img: '/cards/signature.png',
    },
    {
      id: 2,
      key: 'InfiniteCard',
      extraInfo: {
        label: t('InfiniteCard.extraInfoLabel'),
        value: t('InfiniteCard.extraInfoValue'),
      },
      img: '/cards/platinum.png',
    },
  ]

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2" aria-label={t('sectionLabel')}>
      {accountCards.map((card) => (
        <Card key={card.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-primary">
                  {t(`${card.key}.title`)}
                </CardTitle>
                <div className="mt-2 h-1 w-16 bg-primary"></div>
              </div>
              <Image
                src={card.img}
                alt={t(`${card.key}.title`)}
                width={300}
                height={60}
                className="rounded-md"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-4 text-muted-foreground">{t(`${card.key}.description`)}</p>
            {card.extraInfo && (
              <p className="mb-4 text-sm text-muted-foreground">
                *{t('SignatureCard.spendingCriteriaNote')}
              </p>
            )}
            <div className="mb-4 grid grid-cols-2 gap-4">
              <CardInfoItem
                value={t(`${card.key}.withdrawLimit`)}
                label={t(`${card.key}.dailyWithdraw`)}
              />
              <CardInfoItem
                value={t(`${card.key}.yearlyFee`)}
                label={t(`${card.key}.monthlyIncome`)}
              />
            </div>
            {card.extraInfo && (
              <CardInfoItem value={card.extraInfo.value} label={card.extraInfo.label} />
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-stretch">
            <div className="mb-4 flex items-center justify-end space-x-2">
              <Checkbox id={`compare-${card.id}`} />
              <Label htmlFor={`compare-${card.id}`}>{t(`${card.key}.addToCompare`)}</Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full">{t(`${card.key}.applyNow`)}</Button>
              <Button variant="outline" className="w-full">
                {t(`${card.key}.tellMeMore`)}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}

function CardInfoItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
