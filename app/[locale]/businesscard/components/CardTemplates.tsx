import { Card, CardContent } from '@/components/ui/card'
import { FormValuesBC } from '../schema'
import Image from 'next/image'
export const BlueTemplate: React.FC<{ data: FormValuesBC }> = ({ data }) => (
  <Card className="mx-auto max-w-4xl bg-blue-50">
    <CardContent className="p-6">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        {/* Left Side: Info Section */}
        <div className="flex-1">
          {/* Name and Title */}
          <h2 className="text-xl font-bold text-blue-700">{data.fullName.toUpperCase()}</h2>
          <p className="text-sm text-blue-600">{data.title}</p>
          <p className="text-sm text-blue-600">{data.department}</p>

          {/* Contact Information */}
          <div className="mt-4 space-y-1">
            <p className="text-sm text-blue-700">
              <strong>Phone:</strong> {data.phoneNumber}
            </p>
            <p className="text-sm text-blue-700">
              <strong>Email:</strong> {data.email}
            </p>
            <p className="text-sm text-blue-700">
              <strong>LinkedIn:</strong> {data.linkedInUrl}
            </p>
            <p className="text-sm text-blue-700">
              <strong>Address:</strong> {data.address}
            </p>
          </div>
        </div>

        {/* Right Side: Logo */}
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <Image
            src="/placeholder.svg"
            alt="Company Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
      </div>
    </CardContent>
  </Card>
)

export default BlueTemplate

export const GreenTemplate: React.FC<{ data: FormValuesBC }> = ({ data }) => (
  <Card className="mx-auto max-w-4xl bg-green-50">
    <CardContent className="p-6">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-green-700">{data.fullName.toUpperCase()}</h2>
          <p className="text-sm text-green-600">{data.title}</p>
          <p className="text-sm text-green-600">{data.department}</p>
          <div className="mt-4 space-y-1">
            <p className="text-sm text-green-700">
              <strong>Phone:</strong> {data.phoneNumber}
            </p>
            <p className="text-sm text-green-700">
              <strong>Email:</strong> {data.email}
            </p>
            <p className="text-sm text-green-700">
              <strong>LinkedIn:</strong> {data.linkedInUrl}
            </p>
            <p className="text-sm text-green-700">
              <strong>Address:</strong> {data.address}
            </p>
          </div>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <Image
            src="/sb_logo.png?height=150&width=150"
            alt="Company Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
      </div>
    </CardContent>
  </Card>
)

export const PurpleTemplate: React.FC<{ data: FormValuesBC }> = ({ data }) => (
  <Card className="mx-auto max-w-4xl bg-purple-50">
    <CardContent className="p-6">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-purple-700">{data.fullName.toUpperCase()}</h2>
          <p className="text-sm text-purple-600">{data.title}</p>
          <p className="text-sm text-purple-600">{data.department}</p>
          <div className="mt-4 space-y-1">
            <p className="text-sm text-purple-700">
              <strong>Phone:</strong> {data.phoneNumber}
            </p>
            <p className="text-sm text-purple-700">
              <strong>Email:</strong> {data.email}
            </p>
            <p className="text-sm text-purple-700">
              <strong>LinkedIn:</strong> {data.linkedInUrl}
            </p>
            <p className="text-sm text-purple-700">
              <strong>Address:</strong> {data.address}
            </p>
          </div>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <Image
            src="/placeholder.svg?height=150&width=150"
            alt="Company Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
      </div>
    </CardContent>
  </Card>
)
