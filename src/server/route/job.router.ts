import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import {
    createJobSchema,
    updateJobSchema,
    jobListOutputSchema
} from '../../schema/job.schema'
import { createRouter } from '../createRouter'

export const jobRouter = createRouter()
    .mutation('create-job', {
        input: createJobSchema,
        async resolve({ ctx, input }) {
            const { name } = input

            // User has to be signed in
            if (!ctx.user) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            // only admin can change profile details
            if (ctx.user.role !== 'Admin') {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            try {
                const job = await ctx.prisma.job.create({
                    data: {
                        name,
                    }
                })

                return true
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'Job already exists',
                        })
                    }
                }

                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                })
            }
        },
    })
    .mutation('update-job', {
        input: updateJobSchema,
        async resolve({ ctx, input }) {
            const { newName, prevName } = input

            // User has to be signed in
            if (!ctx.user) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            // only admin can change profile details
            if (ctx.user.role !== 'Admin') {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            try {
                const job = await ctx.prisma.job.update({
                    where: {
                        name: prevName
                    },
                    data: {
                        name: newName,
                    }
                })

                return true
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'Job already exists',
                        })
                    }
                }

                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                })
            }
        },
    })
    .query('all', {
        output: jobListOutputSchema,
        async resolve({ ctx }) {
            // User has to be signed in
            if (!ctx.user) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            // only admin can change profile details
            if (ctx.user.role !== 'Admin') {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            const jobList = await ctx.prisma.job.findMany()

            return jobList
        }
    })