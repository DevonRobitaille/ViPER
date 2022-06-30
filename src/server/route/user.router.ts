import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { serialize } from 'cookie'
import { baseUrl, url } from '../../constants'
import {
    createUserSchema,
    requestOtpSchema,
    verifyOtpSchema,
    verifyEmailSchema,
    userListOutputSchema
} from '../../schema/user.schema'
import { decode, encode } from '../../utils/base64'
import { signJwt } from '../../utils/jwt'
import { sendLoginEmail, sendVerifyEmail } from '../../utils/mailer'
import { createRouter } from '../createRouter'

export const userRouter = createRouter()
    .mutation('register-admin', {
        input: createUserSchema,
        async resolve({ ctx, input }) {
            const { email, firstName, lastName } = input

            try {
                // retrieve id of admin role
                let adminRole = await ctx.prisma.role.findFirst({
                    where: {
                        name: "Admin"
                    },
                    select: {
                        id: true
                    }
                })

                if (!adminRole) throw new Error("Role 'ADMIN' does not exist")

                // see if user already exists as admin
                const foundAdmin = await ctx.prisma.user.findFirst({
                    where: {
                        roleId: adminRole.id
                    }
                })

                if (foundAdmin) throw new PrismaClientKnownRequestError('User with role `ADMIN` already exists', 'P2003', "1")

                const user = await ctx.prisma.user.create({
                    data: {
                        email,
                        firstName,
                        lastName,
                        roleId: adminRole.id,
                        isActive: true
                    },
                })

                const token = await ctx.prisma.verificationToken.create({
                    data: {
                        user: {
                            connect: {
                                id: user.id,
                            },
                        },
                    },
                })

                // send email to user
                sendVerifyEmail({
                    token: encode(`${token.id}:${user.email}`),
                    url: baseUrl,
                    email: user.email,
                })

                return true
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'User already exists',
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
    .mutation('register-user', {
        input: createUserSchema,
        async resolve({ ctx, input }) {
            const { email, firstName, lastName } = input

            try {
                // retrieve id of admin role
                let userRole = await ctx.prisma.role.findFirst({
                    where: {
                        name: "User"
                    },
                    select: {
                        id: true
                    }
                })

                if (!userRole) throw new Error("Role 'USER' does not exist")

                const user = await ctx.prisma.user.create({
                    data: {
                        email,
                        firstName,
                        lastName,
                        roleId: userRole.id,
                        isActive: true
                    },
                })

                const token = await ctx.prisma.verificationToken.create({
                    data: {
                        user: {
                            connect: {
                                id: user.id,
                            },
                        },
                    },
                })

                // send email to user
                sendVerifyEmail({
                    token: encode(`${token.id}:${user.email}`),
                    url: baseUrl,
                    email: user.email,
                })

                return true
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'User already exists',
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
    .mutation('request-otp', {
        input: requestOtpSchema,
        async resolve({ ctx, input }) {
            const { email, redirect } = input

            const user = await ctx.prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) {
                throw new trpc.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User not found',
                })
            }

            const token = await ctx.prisma.loginToken.create({
                data: {
                    redirect,
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            })

            // send email to user
            sendLoginEmail({
                token: encode(`${token.id}:${user.email}`),
                url: baseUrl,
                email: user.email,
            })

            return true
        }
    })
    .query('verify-otp', {
        input: verifyOtpSchema,
        async resolve({ ctx, input }) {
            const decoded = decode(input.hash).split(':')
            const [id, email] = decoded

            const token = await ctx.prisma.loginToken.findFirst({
                where: {
                    id,
                    user: {
                        email
                    }
                },
                include: {
                    user: {
                        include: {
                            role: true
                        }
                    }
                }
            })

            if (!token) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            const jwt = signJwt({
                email: token.user.email,
                id: token.user.id,
                role: token.user.role.name,
                firstName: token.user.firstName,
                lastName: token.user.lastName,
            })

            const deleteToken = await ctx.prisma.loginToken.delete({
                where: {
                    id
                }
            })

            ctx.res.setHeader('Set-Cookie', serialize('token', jwt, { path: '/' }))

            return {
                redirect: token.redirect,
            }
        }
    })
    .query('verify-email', {
        input: verifyEmailSchema,
        async resolve({ ctx, input }) {
            const decoded = decode(input.hash).split(':')
            const [id, email] = decoded

            const token = await ctx.prisma.verificationToken.findFirst({
                where: {
                    id,
                    user: {
                        email
                    }
                },
                include: {
                    user: true
                }
            })

            if (!token) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            // token exists which means email can be verified
            const updatedUser = await ctx.prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    emailVerified: new Date()
                },
            })

            const deletedToken = await ctx.prisma.verificationToken.delete({
                where: {
                    id
                },
            })

            return true
        }
    })
    .query('me', {
        async resolve({ ctx }) {
            return ctx.user
        }
    })
    .query('all', {
        output: userListOutputSchema,
        async resolve({ ctx }) {
            if (!ctx.user) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }
            if (ctx.user.role !== 'Admin') {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token',
                })
            }

            // We have verified that the logged in user is an admin which means they can see all users
            const users = await ctx.prisma.user.findMany()
            return users
        }
    })