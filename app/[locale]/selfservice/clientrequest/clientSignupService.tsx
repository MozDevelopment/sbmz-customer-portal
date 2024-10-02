import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SubmitHandler } from 'react-hook-form'
import * as z from 'zod'
// Step 1: Initial Form
const initialFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
})

type InitialFormValues = z.infer<typeof initialFormSchema>

const InitialForm: React.FC<{ form: any; onSubmit: SubmitHandler<InitialFormValues> }> = ({
  form,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register('fullName')} placeholder="Full Name" />
        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
      </div>
      <div>
        <Input {...register('email')} type="email" placeholder="Email" />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Input {...register('phoneNumber')} placeholder="Phone Number" />
        {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
      </div>
      <Button type="submit">Send OTP</Button>
    </form>
  )
}

export default InitialForm
