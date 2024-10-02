import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useTranslations } from 'next-intl' // Importing the i18n function
const Cards = () => {
  const t = useTranslations('Card') // Use the translation hook

  const accountCards = [
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {accountCards.map((card, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-blue-900">
                  {t(`${card.key}.title`)}
                </CardTitle>
                <div className="mt-2 h-1 w-16 bg-blue-500"></div>
              </div>
              <Image
                src={card.img}
                alt="Credit Card"
                width={300}
                height={60}
                className="rounded-md"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-4 text-gray-600">{t(`${card.key}.description`)}</p>
            {card.extraInfo && (
              <p className="mb-4 text-sm text-gray-500">*When meeting the spending criteria</p>
            )}
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold text-blue-900">{t(`${card.key}.withdrawLimit`)}</p>
                <p className="text-sm text-gray-500">{t(`${card.key}.dailyWithdraw`)}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-900">{t(`${card.key}.yearlyFee`)} </p>
                <p className="text-sm text-gray-500">{t(`${card.key}.monthlyIncome`)}</p>
              </div>
            </div>
            {card.extraInfo && (
              <div>
                <p className="text-3xl font-bold text-blue-900">{card.extraInfo.value}</p>
                <p className="text-sm text-gray-500">{card.extraInfo.label}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-stretch">
            <div className="mb-4 flex items-center justify-end space-x-2">
              <Checkbox id={`compare-${index}`} />
              <label
                htmlFor={`compare-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t(`${card.key}.addToCompare`)}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                {t(`${card.key}.applyNow`)}
              </Button>
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                {t(`${card.key}.tellMeMore`)}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Cards
