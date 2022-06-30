export const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'

export const url = `${baseUrl}/api/trpc`

export const ACCESS_TOKEN = "some_secret"
export const ACCESS_TOKEN_AGE = "15s"
export const REFRESH_TOKEN = "some_other_secret"
export const REFRESH_TOKEN_AGE = "1d"