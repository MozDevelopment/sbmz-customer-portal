import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import * as z from 'zod'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ServiceFormValues } from './formTypes'
interface ServiceFormProps {
  form: UseFormReturn<ServiceFormValues>
  onSubmit: SubmitHandler<ServiceFormValues>
}

// Step 2: OTP Form
const otpFormSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

type OtpFormValues = z.infer<typeof otpFormSchema>
const ServiceForm: React.FC<ServiceFormProps> = ({ form, onSubmit }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = form
  const [date, setDate] = useState<Date>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
        <Button type="submit">Submit Request</Button>
      </div>
    </form>
  )
}

export default ServiceForm
