/*
    This file contains everything that the report would need for type
    definition and validation when interacting with the trpc endpoint
*/

import z from 'zod';

export const createReportSchema = z.object({
    vendorId: z.string(),
    reportType: z.string(),
    reportDate: z.date(),
    objectivesReviewed: z.string().optional(),
    performanceScores: z.object({
        '1. On Time Delivery': z.number(),
        '2. Cost': z.number(),
        '3. Quality': z.number(),
        '4. Responsiveness': z.number(),
        '5. Reliability': z.number(),
        '6. Accountability': z.number(),
        '7. Lead Time': z.number(),
        '8. Change Order': z.number(),
        '9. Professionalism': z.number()
    }),
    justification: z.string().optional(),
    overallPerformance: z.number(),
    objectivesFuture: z.string().optional(),
    additionalNotes: z.string().optional()
})
export type CreateReport = z.TypeOf<typeof createReportSchema>
