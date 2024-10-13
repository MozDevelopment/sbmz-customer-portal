import * as z from 'zod'

export const formSchemaBusinessCard = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  phoneNumber: z
    .string()
    .regex(/^\(?\+258\)?\s?(82|83|84|85|86|87)\d{7}$/, { message: 'Invalid phone number.' }),
  department: z.string().min(2, { message: 'Department must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  linkedInUrl: z.string().url({ message: 'Invalid LinkedIn URL.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  template: z.enum(['1', '2', '3'], { required_error: 'You must select a template.' }),
})

export type FormValuesBC = z.infer<typeof formSchemaBusinessCard>
