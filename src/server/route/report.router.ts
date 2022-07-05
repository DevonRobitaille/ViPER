import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { z } from 'zod'
import {
    createReportSchema,
    reportListSchema,
} from '../../schema/report.schema'
import { createRouter } from '../createRouter'

export const reportRouter = createRouter()
    .mutation('create-report', {
        input: createReportSchema,
        output: z.boolean().nullable(),
        async resolve({ ctx, input }) {
            let {
                vendorId,
                reportType,
                reportDate,
                objectivesReviewed,
                performanceScores,
                justification,
                overallPerformance,
                objectivesFuture,
                additionalNotes
            } = input

            try {
                // User has to be signed in
                if (!ctx.user) {
                    throw new trpc.TRPCError({
                        code: 'FORBIDDEN',
                        message: 'Invalid token',
                    })
                }

                // clean data
                reportType = reportType.toUpperCase()
                reportType = reportType.replace(/\s+/g, '_');

                const vendor = await ctx.prisma.vendor.findUnique({
                    where: {
                        id: vendorId
                    }
                })

                if (!vendor) return false

                // Create Report
                const report = await ctx.prisma.report.create({
                    data: {
                        vendor: {
                            connect: {
                                id: vendor.id
                            }
                        },
                        reportType,
                        reportDate,
                        objectivesReviewed,
                        justification,
                        overallPerformance,
                        objectivesFuture,
                        additionalNotes,
                        score: {
                            create: {
                                onTimeDelivery: performanceScores['1. On Time Delivery'],
                                cost: performanceScores['2. Cost'],
                                quality: performanceScores['3. Quality'],
                                reponsiveness: performanceScores['4. Responsiveness'],
                                reliability: performanceScores['5. Reliability'],
                                accountability: performanceScores['6. Accountability'],
                                leadTime: performanceScores['7. Lead Time'],
                                changeOrder: performanceScores['8. Change Order'],
                                professionalism: performanceScores['9. Professionalism'],
                            }
                        },
                        evaluator: {
                            connect: {
                                id: ctx.user.id
                            }
                        }
                    }
                })
                if (!report) throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                })

                return true
            } catch (e) {
                console.error(e)

                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'Report already exists',
                        })
                    }

                    if (e.code === 'P2003') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: e.message,
                        })
                    }
                }

                if (e instanceof Error) {
                    throw new trpc.TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: e.message,
                    })
                }

                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                })
            }
        },
    })
    .query('all', {
        output: reportListSchema,
        async resolve({ ctx }) {
            // User has to be signed in
            if (!ctx.user) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            const reportList = await ctx.prisma.report.findMany({
                include: {
                    evaluator: true,
                    supervisor: true,
                    vendor: {
                        include: {
                            job: true,
                            company: true
                        }
                    }
                }
            })

            if (!reportList) throw new trpc.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Something went wrong',
            })

            return reportList
        }
    })