/*
    This file contains an export of trpc which will be given to the client-side
    of the application to interface with the backend. It is important that the
    type is of appRouter so that the client can guarantee type safety with the
    rest of the backend.
*/

import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '../server/route/app.router';

export const trpc = createReactQueryHooks<AppRouter>()