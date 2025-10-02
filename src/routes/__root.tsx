/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-octal-escape */
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { PropsWithChildren } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// eslint-disable-next-line import-x/no-unresolved
import appCss from '../styles/app.css?url';

import { DefaultCatchBoundary } from 'src/components/DefaultCatchBoundary';
import { NotFound } from 'src/components/NotFound';
import { seo } from 'src/utils/seo';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  ),
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <nav className="flex gap-2 p-2 text-lg [&>*:not(:first-child)]:before:mr-2 [&>*:not(:first-child)]:before:content-['\00B7']">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/filtering"
            search={{ sortBy: 'name' }}
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true, includeSearch: false }}
          >
            Filtering
          </Link>{' '}
          <Link
            to="/filtering-with-usesuspense-query"
            search={{ sortBy: 'name' }}
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true, includeSearch: false }}
          >
            Filtering with useSuspenseQuery
          </Link>{' '}
          <Link
            to="/filtering-with-usequery-promise"
            search={{ sortBy: 'name' }}
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true, includeSearch: false }}
          >
            Filtering with useQuery().promise
          </Link>{' '}
          <Link
            to="/filtering-without-streaming"
            search={{ sortBy: 'name' }}
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true, includeSearch: false }}
          >
            Filtering without streaming
          </Link>{' '}
          <Link
            to="/filtering-without-streaming2"
            search={{ sortBy: 'name' }}
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true, includeSearch: false }}
          >
            Filtering without streaming v2
          </Link>{' '}
          <Link
            to="/form-handling-via-server-routes"
            search={{ sortBy: 'name' }}
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true, includeSearch: false }}
          >
            Form handling via server routes
          </Link>{' '}
          <Link
            to="/form-handling-via-server-actions"
            search={{ sortBy: 'name' }}
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true, includeSearch: false }}
          >
            Form handling via server actions
          </Link>{' '}
          {/* <Link
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            404
          </Link> */}
        </nav>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools initialIsOpen position="right" />
        <Scripts />
      </body>
    </html>
  );
}
