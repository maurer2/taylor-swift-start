import { createFileRoute, Link } from "@tanstack/react-router";
// import { useServerFn } from "@tanstack/react-start";

import {
  listEntriesQueryOptions,
  type ListEntry,
} from "~/server-functions/get-list-entries";
import { List } from "~/components/List";

// import { use } from "react";
import { Suspense } from "react";

type RouteSearchParams = {
  sortBy: Lowercase<keyof ListEntry>;
};

export const Route = createFileRoute("/filtering")({
  component: Filtering,
  validateSearch: (search): RouteSearchParams => {
    if (!Object.hasOwn(search, "sortBy") || search.sortBy === "name") {
      return { sortBy: "name" };
    }

    if (search.sortBy === "abbreviation") {
      return { sortBy: "abbreviation" };
    }

    return { sortBy: "country" };
  },
  beforeLoad: async ({ context: { queryClient }, search: { sortBy } }) => {
    queryClient.prefetchQuery(listEntriesQueryOptions(sortBy));

    return {
      listEntriesQueryOptions,
    };
  },
  loaderDeps: ({ search }) => ({ search }),
  // loader: async ({ context: { queryClient, listEntriesQueryOptions } }) => {
  //   queryClient.prefetchQuery(listEntriesQueryOptions);
  // },
});

const sortByButtonLabels: RouteSearchParams["sortBy"][] = [
  "name",
  "abbreviation",
  "country",
];

function Filtering() {
  // const { list } = Route.useLoaderData();
  // const { isFetching } = Route.useMatch();
  // const { listPromise } = Route.useLoaderData();

  const { sortBy } = Route.useSearch();

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
        <List />
      </Suspense>
    </div>
  );
}
