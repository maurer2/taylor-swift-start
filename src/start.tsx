import { createMiddleware, createStart } from '@tanstack/react-start';
import { createSerializationAdapter } from '@tanstack/react-router';

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: {
        fromFetch: boolean;
      };
    };
  }
}

export const startInstance = createStart(() => {
  return {
    defaultSsr: true,
  };
});

startInstance.createMiddleware().server(({ next, context }) => {
  context.fromFetch;

  return next({
    context: {
      fromStartInstanceMw: true,
    },
  });
});
