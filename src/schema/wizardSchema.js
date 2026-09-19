import { z } from 'zod';

// --- Step 1: Personal Info ---
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      const date = new Date(val);
      if (Number.isNaN(date.getTime())) return false;
      const age = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      return age >= 13;
    }, 'You must be at least 13 years old'),
});

// --- Step 2: Account Details ---
export const accountDetailsSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      // Same pattern the sprint brief calls out; kept intentionally simple.
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Include at least one uppercase letter')
      .regex(/[0-9]/, 'Include at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// --- Full payload (used for the final submit / review step) ---
export const fullWizardSchema = personalInfoSchema.and(accountDetailsSchema);

export const stepSchemas = [personalInfoSchema, accountDetailsSchema, null];
