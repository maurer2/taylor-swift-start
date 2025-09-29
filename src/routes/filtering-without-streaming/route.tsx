import { createFileRoute, Link } from '@tanstack/react-router';
import { Simplify } from 'type-fest';

import { List } from './-components/List';

import { getListEntries, type ListEntry } from 'src/server-functions/get-list-entries';

type SortByValue = Simplify<Lowercase<keyof ListEntry>>;
type RouteSearchParams = {
  sortBy: SortByValue;
};
export const Route = createFileRoute('/filtering-without-streaming')({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: FilteringWithoutStreaming,
  ssr: true, // default
  validateSearch: (search): RouteSearchParams => {
    if (!Object.hasOwn(search, 'sortBy')) {
      throw new Error('Missing sortBy parameter');
    }

    switch (search.sortBy) {
      case 'name':
      case 'abbreviation':
      case 'country':
        return { sortBy: search.sortBy };
      default:
        throw new Error('Invalid sortBy parameter'); // only briefly shown // https://github.com/TanStack/router/issues/3711
    }
  },
  // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#using-search-params-in-loaders
  loaderDeps: ({ search: { sortBy } }) => ({ sortBy }),
  loader: async ({ deps: { sortBy } }) => ({
    getListEntriesPromise: getListEntries({ data: sortBy }),
  }),
  pendingComponent: () => <p className="p-2">Pending</p>, // acts as suspense boundary
  staleTime: 60_000,
  preloadStaleTime: 60_000,
});

const sortByButtonLabels: RouteSearchParams['sortBy'][] = ['name', 'abbreviation', 'country'];

function FilteringWithoutStreaming() {
  const { getListEntriesPromise } = Route.useLoaderData(); // https://github.com/TanStack/router/issues/1553#issuecomment-2117127131

  return (
    <div className="p-2">
      <h3 className="mb-4">Filtering</h3>

      <p className="mb-2" id="filter-sort-by-description">
        Filters on the server via &quot;createServerFn&quot; and url params with preloading. Out of
        the box stuff without TanStack Query.
      </p>

      <search className="mb-4">
        <h4 id="filter-sort-by-title">Sort by</h4>
        <div
          className="flex gap-4"
          role="group"
          aria-labelledby="filter-sort-by-title"
          aria-describedby="filter-sort-by-description"
        >
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

      <List
        getListEntriesPromise={getListEntriesPromise}
        isFetching={false} // todo
      />
    </div>
  );
}
