import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { baseUrl } from '../../constants'
import {
    createReportSchema,
} from '../../schema/report.schema'
import { createRouter } from '../createRouter'

export const reportRouter = createRouter()
    .mutation('create-report', {
        input: createReportSchema,
        async resolve({ ctx, input }) {
            const {
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

                // Create Report

                return true
            } catch (e) {
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