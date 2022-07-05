import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { z } from 'zod'
import { PAGE_SIZE } from '../../constants'
import {
    createReportSchema,
    reportListSchema,
    reportOutputSchema,
    updateReportSchema,
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
                                responsiveness: performanceScores['4. Responsiveness'],
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
    .mutation('update-report', {
        input: updateReportSchema,
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
                additionalNotes,
                id
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
                const report = await ctx.prisma.report.update({
                    where: {
                        id
                    },
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
                            update: {
                                onTimeDelivery: performanceScores['1. On Time Delivery'],
                                cost: performanceScores['2. Cost'],
                                quality: performanceScores['3. Quality'],
                                responsiveness: performanceScores['4. Responsiveness'],
                                reliability: performanceScores['5. Reliability'],
                                accountability: performanceScores['6. Accountability'],
                                leadTime: performanceScores['7. Lead Time'],
                                changeOrder: performanceScores['8. Change Order'],
                                professionalism: performanceScores['9. Professionalism'],
                            }
                        },
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
    .mutation('pagination', {
        input: z.object({
            skip: z.number()
        }),
        output: z.object({
            reportList: reportListSchema,
            maxSize: z.number()
        }).nullable(),
        async resolve({ ctx, input }) {
            const { skip } = input;

            // User has to be signed in
            if (!ctx.user) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            const maxSize = await ctx.prisma.report.count()
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
                },
                skip: skip ? skip : 0,
                take: PAGE_SIZE,
            })

            return {
                reportList: reportList,
                maxSize: maxSize
            }
        }
    })
    .mutation('approve', {
        input: z.object({
            id: z.string()
        }),
        async resolve({ ctx, input }) {
            const { id } = input

            // User has to be signed in
            if (!ctx.user) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            try {

                const report = await ctx.prisma.report.update({
                    where: {
                        id
                    },
                    data: {
                        approvedAt: new Date(),
                        supervisorId: ctx.user.id
                    }
                })

                return true
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'Report already exists',
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
        }
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
    .query('get-id', {
        input: z.object({
            id: z.string()
        }),
        output: reportOutputSchema,
        async resolve({ ctx, input }) {
            const { id } = input

            // User has to be signed in
            if (!ctx.user) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            const report = await ctx.prisma.report.findUnique({
                where: {
                    id
                },
                include: {
                    vendor: {
                        include: {
                            job: true,
                            company: true
                        }
                    },
                    evaluator: true,
                    supervisor: true,
                    score: true
                }
            })

            if (!report) throw new trpc.TRPCError({
                code: 'BAD_REQUEST',
                message: 'Invalid id',
            })

            return report
        }
    })