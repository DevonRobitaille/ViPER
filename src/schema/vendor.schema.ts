/*
    This file contains everything that the vendor would need for type
    definition and validation when interacting with the trpc endpoint
*/

import z from 'zod';

export const createVendorSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email().nullable().optional(),
    companyId: z.string(),
    jobId: z.string()
})
export type CreateVendorInput = z.TypeOf<typeof createVendorSchema>

export const updateVendorSchema = z.object({
    id: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email().nullable().optional(),
    companyId: z.string(),
    jobId: z.string()
})
export type UpdateVendorInput = z.TypeOf<typeof updateVendorSchema>

export const vendorListOutputSchema = z.object({
    id: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email().nullable().optional(),
    company: z.object({
        id: z.string(),
        name: z.string(),
    }),
    job: z.object({
        id: z.string(),
        name: z.string(),
    }),
}).array()
export type VendorListOutput = z.TypeOf<typeof vendorListOutputSchema>