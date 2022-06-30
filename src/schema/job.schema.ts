/*
    This file contains everything that the Job would need for type
    definition and validation when interacting with the trpc endpoint
*/

import z from 'zod';

export const createJobSchema = z.object({
    name: z.string().min(1),
})
export type CreateJobInput = z.TypeOf<typeof createJobSchema>

export const updateJobSchema = z.object({
    newName: z.string().min(1),
    prevName: z.string().min(1),
})
export type UpdateJobInput = z.TypeOf<typeof updateJobSchema>

export const jobListOutputSchema = z.object({
    id: z.string(),
    name: z.string(),
}).array()
export type JobListOutput = z.TypeOf<typeof jobListOutputSchema>

export const jobListBoxSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    contact: z.string().email().nullable().optional()
})
export type JobListBoxSchema = z.TypeOf<typeof jobListBoxSchema>