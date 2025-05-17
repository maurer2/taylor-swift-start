import { createFileRoute, Link } from '@tanstack/react-router';
import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { useServerFn } from "@tanstack/react-start";

import { listEntriesQueryOptions, type ListEntry } from '~/server-functions/get-list-entries';
import { List } from './-components/List';

type RouteSearchParams = {
  sortBy: Lowercase<keyof ListEntry>;
};

export const Route = createFileRoute('/filtering-prefetch-in-render')({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: FilteringPrefetchInRender,
  validateSearch: (search): RouteSearchParams => {
    if (!Object.hasOwn(search, 'sortBy') || search.sortBy === 'name') {
      return { sortBy: 'name' };
    }

    if (search.sortBy === 'abbreviation') {
      return { sortBy: 'abbreviation' };
    }

    return { sortBy: 'country' };
  },
  // store query options in context
  // https://tanstack.com/query/latest/docs/framework/react/guides/prefetching#router-integration
  beforeLoad: () => ({
    queryOptionsListEntries: listEntriesQueryOptions,
  }),
  // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#using-search-params-in-loaders
  loaderDeps: ({ search: { sortBy } }) => ({ sortBy }),
  loader: async ({ context: { queryClient, queryOptionsListEntries }, deps: { sortBy } }) => {
    // https://tkdodo.eu/blog/react-query-meets-react-router#getquerydata--fetchquery
    queryClient.ensureQueryData(queryOptionsListEntries(sortBy));
  },
});

const sortByButtonLabels: RouteSearchParams['sortBy'][] = ['name', 'abbreviation', 'country'];

function FilteringPrefetchInRender() {
  const { sortBy } = Route.useSearch();
  const listEntriesQuery = useQuery(listEntriesQueryOptions(sortBy));

  return (
    <div className="p-2">
      <h3 className="mb-4">Filtering prefetch in render</h3>

      <search className="mb-4">
        <h4 id="filter-sort-by-title">Sort by</h4>
        <div className="flex gap-4" role="group" aria-describedby="filter-sort-by-title">
          {sortByButtonLabels.map((sortByButton) => (
            <Link
              to="."
              search={{ sortBy: sortByButton }}
              className="uppercase"
              key={sortByButton}
              activeProps={{
                className: 'bg-red-500',
              }}
            >
              {sortByButton}
            </Link>
          ))}
        </div>
      </search>

      <hr />

      <Suspense fallback={<p>Loading list</p>}>
        <List listEntriesQuery={listEntriesQuery} />
      </Suspense>
    </div>
  );
}
