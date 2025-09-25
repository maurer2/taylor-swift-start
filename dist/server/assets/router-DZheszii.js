import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRouteWithContext, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { queryOptions, QueryClient } from "@tanstack/react-query";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { l as listJSON } from "./list-DVwSiydC.js";
import { c as createServerFn, a as createServerRpc } from "../server.js";
function DefaultCatchBoundary({ error }) {
  const router2 = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error("DefaultCatchBoundary Error:", error);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
          },
          type: "button",
          className: `rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700`,
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700`,
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700`,
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) }),
    /* @__PURE__ */ jsxs("p", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.history.back(),
          className: "rounded bg-emerald-500 px-2 py-1 text-sm font-black text-white uppercase",
          type: "button",
          children: "Go back"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "rounded bg-cyan-600 px-2 py-1 text-sm font-black text-white uppercase",
          children: "Start Over"
        }
      )
    ] })
  ] });
}
const seo = ({
  title,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@tannerlinsley" },
    { name: "twitter:site", content: "@tannerlinsley" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...image ? [
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ] : []
  ];
  return tags;
};
const Route$4 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      ...seo({
        title: "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `
      })
    ],
    links: [
      // { rel: 'stylesheet', href: appCss },
      { rel: "stylesheet" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" }
    ]
  }),
  errorComponent: (props) => /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props }) }),
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 p-2 text-lg [&>*:not(:first-child)]:before:mr-2 [&>*:not(:first-child)]:before:content-['\\00B7']", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            activeProps: {
              className: "font-bold"
            },
            activeOptions: { exact: true },
            children: "Home"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/filtering",
            search: { sortBy: "name" },
            activeProps: {
              className: "font-bold"
            },
            activeOptions: { exact: true, includeSearch: false },
            children: "Filtering"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/filtering-with-tanstack-query",
            search: { sortBy: "name" },
            activeProps: {
              className: "font-bold"
            },
            activeOptions: { exact: true, includeSearch: false },
            children: "Filtering with TanStack Query"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/filtering-prefetch-in-render",
            search: { sortBy: "name" },
            activeProps: {
              className: "font-bold"
            },
            activeOptions: { exact: true, includeSearch: false },
            children: "Filtering prefetch in render"
          }
        ),
        " "
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      children,
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsx(ReactQueryDevtools, { initialIsOpen: true, position: "right" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const MIN_DURATION = 1500;
const collator = new Intl.Collator("en-GB", {
  sensitivity: "base"
});
const sortListByField = (list, sortBy) => {
  switch (sortBy) {
    case "name": {
      return list.toSorted((entryA, entryB) => collator.compare(entryA.name, entryB.name));
    }
    case "abbreviation": {
      return list.toSorted((entryA, entryB) => collator.compare(entryA.abbreviation, entryB.abbreviation));
    }
    case "country":
      return list.toSorted((entryA, entryB) => collator.compare(entryA.country, entryB.country));
    default:
      return sortBy;
  }
};
const getListEntries_createServerFn_handler = createServerRpc("src_server-functions_get-list-entries_index_ts--getListEntries_createServerFn_handler", (opts, signal) => {
  return getListEntries.__executeServer(opts, signal);
});
const getListEntries = createServerFn().inputValidator((sortBy) => {
  if (sortBy === null || typeof sortBy !== "string") {
    throw new Error("Invalid or missing sortBy parameter");
  }
  switch (sortBy) {
    case "name":
    case "abbreviation":
    case "country":
      return {
        sortBy
      };
    default:
      throw new Error("Invalid sortBy parameter");
  }
}).handler(getListEntries_createServerFn_handler, async ({
  data: {
    sortBy
  }
}) => {
  const promises = await Promise.all([new Promise((resolve) => resolve(sortListByField(listJSON, sortBy))), new Promise((resolve) => setTimeout(() => resolve(), MIN_DURATION))]).catch((error) => {
    throw new Error("Error", {
      cause: error
    });
  });
  return promises[0];
});
const listEntriesQueryOptions = (sortBy) => queryOptions({
  queryKey: ["list-entries", sortBy],
  // key for param for server function needs to be  "data"
  queryFn: async () => getListEntries({
    data: sortBy
  }),
  staleTime: 60 * 1e3,
  refetchOnWindowFocus: false
});
const $$splitComponentImporter$3 = () => import("./route-D1uj_DKU.js");
const Route$3 = createFileRoute("/filtering-with-tanstack-query")({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  validateSearch: (search) => {
    if (!Object.hasOwn(search, "sortBy") || search.sortBy === "name") {
      return {
        sortBy: "name"
      };
    }
    if (search.sortBy === "abbreviation") {
      return {
        sortBy: "abbreviation"
      };
    }
    return {
      sortBy: "country"
    };
  },
  // store query options in context
  // https://tanstack.com/query/latest/docs/framework/react/guides/prefetching#router-integration
  beforeLoad: () => ({
    queryOptionsListEntries: listEntriesQueryOptions
  }),
  // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#using-search-params-in-loaders
  loaderDeps: ({
    search: {
      sortBy
    }
  }) => ({
    sortBy
  }),
  loader: async ({
    context: {
      queryClient,
      queryOptionsListEntries
    },
    deps: {
      sortBy
    }
  }) => {
    queryClient.ensureQueryData(queryOptionsListEntries(sortBy));
  }
});
const $$splitComponentImporter$2 = () => import("./route-Cmcc-PN2.js");
const Route$2 = createFileRoute("/filtering-prefetch-in-render")({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  validateSearch: (search) => {
    if (!Object.hasOwn(search, "sortBy") || search.sortBy === "name") {
      return {
        sortBy: "name"
      };
    }
    if (search.sortBy === "abbreviation") {
      return {
        sortBy: "abbreviation"
      };
    }
    return {
      sortBy: "country"
    };
  },
  // store query options in context
  // https://tanstack.com/query/latest/docs/framework/react/guides/prefetching#router-integration
  beforeLoad: () => ({
    queryOptionsListEntries: listEntriesQueryOptions
  }),
  // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#using-search-params-in-loaders
  loaderDeps: ({
    search: {
      sortBy
    }
  }) => ({
    sortBy
  }),
  loader: async ({
    context: {
      queryClient,
      queryOptionsListEntries
    },
    deps: {
      sortBy
    }
  }) => {
    queryClient.ensureQueryData(queryOptionsListEntries(sortBy));
  }
});
const $$splitComponentImporter$1 = () => import("./route-BrusxdYB.js");
const Route$1 = createFileRoute("/filtering")({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  validateSearch: (search) => {
    if (!Object.hasOwn(search, "sortBy")) {
      throw new Error("Missing sortBy parameter");
    }
    switch (search.sortBy) {
      case "name":
      case "abbreviation":
      case "country":
        return {
          sortBy: search.sortBy
        };
      default:
        throw new Error("Invalid sortBy parameter");
    }
  },
  // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#using-search-params-in-loaders
  loaderDeps: ({
    search: {
      sortBy
    }
  }) => ({
    sortBy
  }),
  // eslint-disable-next-line arrow-body-style
  loader: async ({
    deps: {
      sortBy
    }
  }) => {
    return {
      getListEntriesPromise: getListEntries({
        data: sortBy
      })
    };
  },
  // onCatch(error) {
  //   console.error('Error in route loader:', error);
  // },
  // errorComponent: (error) => <ErrorComponent error={new Error('Error', { cause: error.error })} />,
  staleTime: 6e4,
  preloadStaleTime: 6e4
});
const $$splitComponentImporter = () => import("./index-LGju1Eq9.js");
const Route = createFileRoute("/")({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const FilteringWithTanstackQueryRouteRoute = Route$3.update({
  id: "/filtering-with-tanstack-query",
  path: "/filtering-with-tanstack-query",
  getParentRoute: () => Route$4
});
const FilteringPrefetchInRenderRouteRoute = Route$2.update({
  id: "/filtering-prefetch-in-render",
  path: "/filtering-prefetch-in-render",
  getParentRoute: () => Route$4
});
const FilteringRouteRoute = Route$1.update({
  id: "/filtering",
  path: "/filtering",
  getParentRoute: () => Route$4
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  FilteringRouteRoute,
  FilteringPrefetchInRenderRouteRoute,
  FilteringWithTanstackQueryRouteRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // https://tanstack.com/query/latest/docs/framework/react/guides/suspense/#using-usequerypromise-and-reactuse-experimental
        experimental_prefetchInRender: true
      }
    }
  });
  const router2 = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
    scrollRestoration: true,
    context: {
      queryClient
    },
    defaultPreloadStaleTime: 0
  });
  return routerWithQueryClient(router2, queryClient);
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$3 as R,
  Route$2 as a,
  Route$1 as b,
  listEntriesQueryOptions as l,
  router as r
};
