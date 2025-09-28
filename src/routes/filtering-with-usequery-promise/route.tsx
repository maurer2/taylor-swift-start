import { createFileRoute, Link } from '@tanstack/react-router';
import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Simplify } from 'type-fest';

import { List } from './-components/List';

import { listEntriesQueryOptions, type ListEntry } from '~/server-functions/get-list-entries';

type SortByValue = Simplify<Lowercase<keyof ListEntry>>;
type RouteSearchParams = {
  sortBy: SortByValue;
};

export const Route = createFileRoute('/filtering-with-usequery-promise')({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: FilteringWithUseQueryPromise,
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
  // beforeLoad: () => ({
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

function FilteringWithUseQueryPromise() {
  const { sortBy } = Route.useSearch();
  const listEntriesQuery = useQuery(listEntriesQueryOptions(sortBy));

  return (
    <div className="p-2">
      <section className="max-w-[80ch]">
        <h3 className="mb-4">Filtering with &quot;useQuery().promise&quot;</h3>

        <p className="mb-2" id="filter-sort-by-description">
          Filters data on the server via &quot;createServerFn&quot; and url params with prefetching
          of the current page. Doesn&apos;t block page rendering while data is being fetched. Uses
          the standard &quot;useQuery&quot;-method with &quot;use()&quot; and the experimental
          <a href="https://tanstack.com/query/latest/docs/framework/react/guides/suspense#using-usequerypromise-and-reactuse-experimental">
            &quot;useQuery().promise&quot;-feature
          </a>{' '}
          of TanStack Query.
        </p>
      </section>

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
        <List listEntriesQuery={listEntriesQuery} />
      </Suspense>
    </div>
  );
}
