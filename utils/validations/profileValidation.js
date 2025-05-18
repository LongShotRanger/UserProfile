import { z } from 'zod';

const profileSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  bio: z.string().optional(),
  profile_photo: z.string().url('Invalid URL').optional(),
  settings: z.object({
    dark_mode: z.boolean(),
    email_notifications: z.boolean(),
  }),
});

export function validateProfile(data) {
  const result = profileSchema.safeParse(data);

  if (!result.success) {
    const errors = {};
    for (const issue of result.error.errors) {
      const key = issue.path.join('.');
      errors[key] = issue.message;
    }
    return { success: false, errors };
  }

  return { success: true, data: result.data };
}
