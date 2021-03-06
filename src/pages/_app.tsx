import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import superjson from 'superjson'
import { url } from '../constants'
import { AppRouter } from '../server/route/app.router'
import { trpc } from '../utils/trpc'
import { UserContextProvider } from '../context/user.context'
import NavBar from '../components/navBar'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error, isLoading } = trpc.useQuery(['users.me'])
  const router = useRouter();

  if (isLoading) {
    return <>Loading user...</>
  }

  if (router.pathname !== '/' && router.pathname !== '/setup' && !data) router.push('/')

  return (
    <UserContextProvider value={data}>
      {data && data.role && router.pathname !== '/' && router.pathname !== '/setup' && <NavBar />}
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ]

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          }
        }
        return {}
      },
      links,
      transformer: superjson,
    }
  },
  ssr: false,
})(MyApp)