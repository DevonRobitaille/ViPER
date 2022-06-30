/*
    This file contains everything that the user would need for type
    definition and validation when interacting with the trpc endpoint
*/

import z from 'zod';

export const loginUserInputSchema = z.object({
    email: z.string().email()
})
export type LoginUserInput = z.TypeOf<typeof loginUserInputSchema>

export const createUserSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
})
export type CreateUserInput = z.TypeOf<typeof createUserSchema>

export const userSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    emailVerified: z.date().optional(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    roleId: z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        value: z.number().optional(),
    })
})
export type User = z.TypeOf<typeof userSchema>

export const verifyEmailSchema = z.object({
    hash: z.string()
})
export type VerifyEmail = z.TypeOf<typeof verifyEmailSchema>

export const requestOtpSchema = z.object({
    email: z.string().email(),
    redirect: z.string().default('/'),
})
export type RequestOtpInput = z.TypeOf<typeof requestOtpSchema>

export const verifyOtpSchema = z.object({
    hash: z.string(),
})
export type VerifyOtpSchema = z.TypeOf<typeof verifyOtpSchema>

export const userListOutputSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    emailVerified: z.date(),
    isActive: z.boolean(),
    role: z.object({
        name: z.string(),
        value: z.number()
    })
}).array()
export type UserListOutput = z.TypeOf<typeof userListOutputSchema>

export const updateUserSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    newEmail: z.string().email(),
    prevEmail: z.string().email(),
})
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>