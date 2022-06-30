import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import {
    createCompanySchema,
    updateCompanySchema,
    companyListOutputSchema
} from '../../schema/company.schema'
import { createRouter } from '../createRouter'

export const companyRouter = createRouter()
    .mutation('create-company', {
        input: createCompanySchema,
        async resolve({ ctx, input }) {
            const { name, contact } = input

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
                const company = await ctx.prisma.company.create({
                    data: {
                        name,
                        contact
                    }
                })

                return true
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'Company already exists',
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
    .mutation('update-company', {
        input: updateCompanySchema,
        async resolve({ ctx, input }) {
            const { newName, prevName, contact } = input

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
                const company = await ctx.prisma.company.update({
                    where: {
                        name: prevName
                    },
                    data: {
                        name: newName,
                        contact
                    }
                })

                return true
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'Company already exists',
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
        output: companyListOutputSchema,
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

            const companyList = await ctx.prisma.company.findMany()

            return companyList
        }
    })