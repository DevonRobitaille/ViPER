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

export const reportListSchema = z.object({
    id: z.string(),
    vendor: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email().optional().nullable(),
        job: z.object({
            name: z.string()
        }),
        company: z.object({
            name: z.string()
        })
    }),
    evaluator: z.object({
        firstName: z.string(),
        lastName: z.string()
    }),
    supervisor: z.object({
        firstName: z.string(),
        lastName: z.string()
    }).optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
}).array()
export type ReportListSchema = z.TypeOf<typeof reportListSchema>

export const reportOutputSchema = z.object({
    id: z.string(),
    vendor: z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().optional().nullable(),
        job: z.object({
            name: z.string(),
            id: z.string()
        }),
        company: z.object({
            name: z.string(),
            id: z.string()
        })
    }),
    evaluator: z.object({
        firstName: z.string(),
        lastName: z.string()
    }),
    supervisor: z.object({
        firstName: z.string(),
        lastName: z.string()
    }).optional().nullable(),
    updatedAt: z.date(),
    createdAt: z.date(),
    approvedAt: z.date().optional().nullable(),
    reportType: z.string(),
    reportDate: z.date(),
    objectivesReviewed: z.string().optional(),
    score: z.object({
        id: z.string(),
        onTimeDelivery: z.number(),
        cost: z.number(),
        quality: z.number(),
        responsiveness: z.number(),
        reliability: z.number(),
        accountability: z.number(),
        leadTime: z.number(),
        changeOrder: z.number(),
        professionalism: z.number(),
    }),
    justification: z.string().optional(),
    overallPerformance: z.number(),
    objectivesFuture: z.string().optional(),
    additionalNotes: z.string().optional()
})
export type ReportOutput = z.TypeOf<typeof reportOutputSchema>

export const updateReportSchema = z.object({
    id: z.string(),
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
export type UpdateReport = z.TypeOf<typeof updateReportSchema>
