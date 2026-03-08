/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-octal-escape */
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  type LinkProps,
} from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

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

const navLinks: (LinkProps & { text: string })[] = [
  {
    to: '/',
    text: 'Home',
    activeOptions: { exact: true },
  },
  {
    to: '/filtering',
    search: { sortBy: 'name' },
    text: 'Filtering',
    activeOptions: { exact: true, includeSearch: false },
  },
  {
    to: '/filtering-with-usesuspense-query',
    search: { sortBy: 'name' },
    text: 'Filtering with useSuspenseQuery',
    activeOptions: { exact: true, includeSearch: false },
  },
  {
    to: '/filtering-with-usequery-promise',
    search: { sortBy: 'name' },
    text: 'Filtering with useQuery().promise',
    activeOptions: { exact: true, includeSearch: false },
  },
  {
    to: '/filtering-without-streaming',
    search: { sortBy: 'name' },
    text: 'Filtering without streaming',
    activeOptions: { exact: true, includeSearch: false },
  },
  {
    to: '/filtering-without-streaming2',
    search: { sortBy: 'name' },
    text: 'Filtering without streaming v2',
    activeOptions: { exact: true, includeSearch: false },
  },
  {
    to: '/form-handling-via-server-routes',
    search: { sortBy: 'name' },
    text: 'Form handling via server routes',
    activeOptions: { exact: true, includeSearch: false },
  },
  {
    to: '/form-handling-via-server-actions',
    search: { sortBy: 'name' },
    text: 'Form handling via server actions',
    activeOptions: { exact: true, includeSearch: false },
  },
];

function RootDocument({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <nav aria-label="Main navigation">
          <ul
            role="menubar"
            className="flex flex-wrap gap-2 p-2 text-lg [&>li>*:not(:first-child)]:after:ml-2 [&>li>*:not(:first-child)]:after:content-['\00B7']"
            // @ts-expect-error new property
            // eslint-disable-next-line react/no-unknown-property
            focusgroup="menubar inline wrap nomemory"
          >
            <li className="contents" role="none">
              {navLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  search={link.search}
                  activeProps={{
                    className: 'font-bold',
                  }}
                  activeOptions={link.activeOptions}
                  role="menuitem"
                  // @ts-expect-error new property
                  focusgroupstart={index === 2 ? 'true' : undefined}
                >
                  {link.text}
                </Link>
              ))}
            </li>
          </ul>
        </nav>
        <hr />
        {children}

        <TanStackDevtools
          config={{
            position: 'bottom-right',
            defaultOpen: true,
          }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: 'TanStack Query',
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
