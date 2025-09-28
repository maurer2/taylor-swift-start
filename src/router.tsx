import { createRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

import { routeTree } from './routeTree.gen';
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary';
import { NotFound } from './components/NotFound';

export function getRouter() {
  // https://www.brenelz.com/posts/using-server-functions-and-tanstack-query/
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // https://tanstack.com/query/latest/docs/framework/react/guides/suspense/#using-usequerypromise-and-reactuse-experimental
        experimental_prefetchInRender: true,
      },
    },
  });

  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    context: {
      queryClient,
    },
    defaultPreloadStaleTime: 0,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
