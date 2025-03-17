import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";

import {
  getListEntries,
  type ListEntry,
} from "~/server-functions/get-list-entries";
import { List } from "./-components/List";

type RouteSearchParams = {
  sortBy: Lowercase<keyof ListEntry>;
};

export const Route = createFileRoute("/filtering-without-tanstack-query")({
  component: FilteringWithoutTanstackQuery,
  validateSearch: (search): RouteSearchParams => {
    if (!Object.hasOwn(search, "sortBy") || search.sortBy === "name") {
      return { sortBy: "name" };
    }

    if (search.sortBy === "abbreviation") {
      return { sortBy: "abbreviation" };
    }

    return { sortBy: "country" };
  },
  // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#using-search-params-in-loaders
  loaderDeps: ({ search: { sortBy } }) => ({ sortBy }),
  loader: ({ deps: { sortBy } }) => {
    return {
      getListEntriesPromise: getListEntries({ data: sortBy }),
    };
  },
  staleTime: 60_000,
  preloadStaleTime: 60_000,
});

const sortByButtonLabels: RouteSearchParams["sortBy"][] = [
  "name",
  "abbreviation",
  "country",
];

function FilteringWithoutTanstackQuery() {
  const { getListEntriesPromise } = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3 className="mb-4">Filtering</h3>

      <search className="mb-4">
        <h4 id="filter-sort-by-title">Sort by</h4>
        <div
          className="flex gap-4"
          role="group"
          aria-describedby="filter-sort-by-title"
        >
          {sortByButtonLabels.map((sortByButton) => (
            <Link
              to="."
              search={{ sortBy: sortByButton }}
              className="uppercase"
              key={sortByButton}
              activeProps={{
                className: "bg-red-500",
              }}
            >
              {sortByButton}
            </Link>
          ))}
        </div>
      </search>

      <hr />

      <Suspense fallback={<p>Loading list</p>}>
        <List
          getListEntriesPromise={getListEntriesPromise}
          isFetching={false} // todo
        />
      </Suspense>
    </div>
  );
}
