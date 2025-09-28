import { createFileRoute, Link } from '@tanstack/react-router';
import { Suspense } from 'react';
import { Simplify } from 'type-fest';

import { List } from './-components/List';

import { listEntriesQueryOptions, type ListEntry } from 'src/server-functions/get-list-entries';

// Workaround TS
type SortByValue = Simplify<Lowercase<keyof ListEntry>>;
type RouteSearchParams = {
  sortBy: SortByValue;
};

export const Route = createFileRoute('/filtering-with-tanstack-query')({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: FilteringWithTanstackQuery,
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
  // search param needs to be kept otherwise, otherwise TS complains that search is is missing from loaderDeps and loader unless beforeLoad is omitted
  // @ts-ignore Type '() => Promise<{ name: string; abbreviation: string; country: string; }[]>' is not assignable to type '"Function is not serializable"
  // beforeLoad: ({ search }) => ({
  //   queryOptionsListEntries: listEntriesQueryOptions,
  // }),
  // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#using-search-params-in-loaders
  // https://github.com/TanStack/query/discussions/9135#:~:text=Confusion%20around%20when%20to%20use%20what
  loaderDeps: ({ search: { sortBy } }) => ({ sortBy }),
  loader: async ({ context: { queryClient }, deps: { sortBy } }) => {
    // https://tkdodo.eu/blog/react-query-meets-react-router#getquerydata--fetchquery
    queryClient.ensureQueryData(listEntriesQueryOptions(sortBy));
  },
});

const sortByButtonLabels: RouteSearchParams['sortBy'][] = ['name', 'abbreviation', 'country'];

function FilteringWithTanstackQuery() {
  // const { list } = Route.useLoaderData();
  // const { isFetching } = Route.useMatch();
  // const { listPromise } = Route.useLoaderData();
  const { sortBy } = Route.useSearch();

  return (
    <div className="p-2">
      <h3 className="mb-4">Filtering with Tanstack Query</h3>

      <p className="mb-2" id="filter-sort-by-description">
        Filters data on the server via &quot;createServerFn&quot; and url params with prefetching of
        the current page. Doesn&apos;t block page rendering while data is being fetched. Uses the
        &quot;useSuspenseQuery&quot;-method of Tanstack Query.
      </p>

      <search className="mb-4">
        <h4 id="filter-sort-by-title">Sort by</h4>
        <div className="flex gap-4" role="group" aria-labelledby="filter-sort-by-title">
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
        <List />
      </Suspense>
    </div>
  );
}
