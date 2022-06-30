/*
    This file contains everything that the company would need for type
    definition and validation when interacting with the trpc endpoint
*/

import z from 'zod';

export const createCompanySchema = z.object({
    name: z.string().min(1),
    contact: z.string().email().nullable().optional()
})
export type CreateCompanyInput = z.TypeOf<typeof createCompanySchema>

export const updateCompanySchema = z.object({
    newName: z.string().min(1),
    prevName: z.string().min(1),
    contact: z.string().email().nullable().optional()
})
export type UpdateCompanyInput = z.TypeOf<typeof updateCompanySchema>

export const companyListOutputSchema = z.object({
    id: z.string(),
    name: z.string(),
    contact: z.string().nullable().optional(),
}).array()
export type CompanyListOutput = z.TypeOf<typeof companyListOutputSchema>