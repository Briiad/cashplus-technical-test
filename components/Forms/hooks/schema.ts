"use client"

import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
})
export type LoginSchemaType = typeof loginSchema

export const signupSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must have Uppercase, Lowercase, Number, and Special Character"),
  confirmPassword: z.string().min(1, "Password Confirmation is required"),
})
export type SignupSchemaType = typeof signupSchema