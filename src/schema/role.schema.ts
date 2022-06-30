/*
    This file contains everything that the role would need for type
    definition and validation when interacting with the trpc endpoint
*/

import z from 'zod';

export const roleSchema = z.object({
    id: z.string(),
    name: z.string(),
    value: z.number(),
})

export type RoleSchema = z.TypeOf<typeof roleSchema>