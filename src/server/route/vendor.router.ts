import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import {
    createVendorSchema,
    vendorListOutputSchema,
    updateVendorSchema
} from '../../schema/vendor.schema'
import { createRouter } from '../createRouter'

export const vendorRouter = createRouter()
    .mutation('create-vendor', {
        input: createVendorSchema,
        async resolve({ ctx, input }) {
            const { firstName, lastName, email, companyId, jobId } = input

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
                const vendor = await ctx.prisma.vendor.create({
                    data: {
                        firstName,
                        lastName,
                        email,
                        companyId,
                        jobId
                    }
                })

                return true
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'Vendor already exists',
                        })
                    }
                }

                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                })
            }
        }
    })
    .mutation('update-vendor', {
        input: updateVendorSchema,
        async resolve({ ctx, input }) {
            const { id, firstName, lastName, email, companyId, jobId } = input

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
                const vendor = await ctx.prisma.vendor.update({
                    where: {
                        id
                    },
                    data: {
                        firstName,
                        lastName,
                        email,
                        companyId,
                        jobId
                    }
                })

                return true
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'Vendor already exists',
                        })
                    }
                }

                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                })
            }
        }
    })
    .query('all', {
        output: vendorListOutputSchema,
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

            const vendorList = await ctx.prisma.vendor.findMany({
                include: {
                    company: true,
                    job: true
                }
            })
            return vendorList
        }
    })