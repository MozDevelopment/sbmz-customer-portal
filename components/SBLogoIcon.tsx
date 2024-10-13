import React from 'react'
import Image from 'next/image'

/**
 * A simple component that renders the Standard Bank logo.
 *
 * @returns A `next/image` component with the Standard Bank logo.
 */
const SBLogoIcon: React.FC = (): JSX.Element => {
  return <Image src="/sb_logo.png" alt="Standard Bank Logo" height={50} width={50} />
}

export default SBLogoIcon
