/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as FilteringRouteImport } from './routes/filtering/route'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const FilteringRouteRoute = FilteringRouteImport.update({
  id: '/filtering',
  path: '/filtering',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/filtering': {
      id: '/filtering'
      path: '/filtering'
      fullPath: '/filtering'
      preLoaderRoute: typeof FilteringRouteImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/filtering': typeof FilteringRouteRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/filtering': typeof FilteringRouteRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/filtering': typeof FilteringRouteRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/filtering'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/filtering'
  id: '__root__' | '/' | '/filtering'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  FilteringRouteRoute: typeof FilteringRouteRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  FilteringRouteRoute: FilteringRouteRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/filtering"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/filtering": {
      "filePath": "filtering/route.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
