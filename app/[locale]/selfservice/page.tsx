import { FC } from 'react'
import CustomerServiceLinks from './clientServices'
/**
 * Page component that renders the customer services page.
 *
 * This component renders a page containing a collection of customer service links.
 *
 * @returns The JSX element for the page.
 */
const Page: FC = (): JSX.Element => {
  return (
    <>
      <CustomerServiceLinks />
    </>
  )
}

export default Page
