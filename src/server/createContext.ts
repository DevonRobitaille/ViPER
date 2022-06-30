/*
    This file contains the context (ctx) variable that will be passed
    between the different endpoints of trpc to grab the request, response,
    prisma, and user objects

    Attached as type definitions to:
    /src/server/createRouter.ts (for line 7 - return router...)
*/

import { NextApiRequest, NextApiResponse } from 'next'
import { verifyJwt } from '../utils/jwt'
import { prisma } from '../utils/prisma'

interface CtxUser {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    iat: string
    exp: number
}

function getUserFromRequest(req: NextApiRequest) {
    const token = req.cookies.token

    if (token) {
        try {
            const verified = verifyJwt<CtxUser>(token)
            return verified
        } catch (e) {
            return null
        }
    }

    return null
}

export function createContext({
    req,
    res,
}: {
    req: NextApiRequest
    res: NextApiResponse
}) {
    const user = getUserFromRequest(req)

    return { req, res, prisma, user }
}

export type Context = ReturnType<typeof createContext>