/*
    This file contains everything that the company would need for type
    definition and validation when interacting with the trpc endpoint
*/

import z from 'zod';

export const createCompanySchema = z.object({
    name: z.string(),
    contact: z.string().email().optional()
})
export type CreateCompanyInput = z.TypeOf<typeof createCompanySchema>

export const updateCompanySchema = z.object({
    name: z.string(),
    contact: z.string().email().optional()
})
export type UpdateCompanyInput = z.TypeOf<typeof updateCompanySchema>