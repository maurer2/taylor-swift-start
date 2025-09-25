const createMiddleware = (options, __opts) => {
  const resolvedOptions = {
    type: "request",
    ...__opts || options
  };
  return {
    options: resolvedOptions,
    middleware: (middleware) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { middleware })
      );
    },
    inputValidator: (inputValidator) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { inputValidator })
      );
    },
    client: (client) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { client })
      );
    },
    server: (server) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { server })
      );
    }
  };
};
const createStart = (getOptions) => {
  return {
    getOptions: async () => {
      const options = await getOptions();
      return options;
    },
    createMiddleware
  };
};
class Test {
  constructor(test) {
    this.test = test;
  }
  init() {
    return this.test;
  }
}
const startInstance = createStart(() => {
  return {
    defaultSsr: true
  };
});
startInstance.createMiddleware().server(({ next, context }) => {
  context.fromFetch;
  return next({
    context: {
      fromStartInstanceMw: true
    }
  });
});
export {
  Test,
  startInstance
};
