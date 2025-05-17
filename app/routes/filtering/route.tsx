import { createFileRoute, Link, ErrorComponent } from '@tanstack/react-router';
import { Suspense } from 'react';

import { List } from './-components/List';

import { getListEntries, type ListEntry } from '~/server-functions/get-list-entries';

type RouteSearchParams = {
  sortBy: Lowercase<keyof ListEntry>;
};

export const Route = createFileRoute('/filtering')({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: Filtering,
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
        throw new Error('Invalid sortBy parameter'); // briefly shown // https://github.com/TanStack/router/issues/3711
    }
  },
  // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#using-search-params-in-loaders
  loaderDeps: ({ search: { sortBy } }) => ({ sortBy }),
  // eslint-disable-next-line arrow-body-style
  loader: async ({ deps: { sortBy } }) => {
    //  const dummyList = [
    //   {
    //     name: 'Aberdeenshire',
    //     abbreviation: 'ABD',
    //     country: 'Scotland',
    //   },
    // ];

    // return {
    //   getListEntriesPromise: Promise.resolve(dummyList),
    // };

    return {
      getListEntriesPromise: getListEntries({ data: sortBy }),
    };
  },
  // onCatch(error) {
  //   console.error('Error in route loader:', error);
  // },
  // errorComponent: (error) => <ErrorComponent error={new Error('Error', { cause: error.error })} />,
  staleTime: 60_000,
  preloadStaleTime: 60_000,
});

const sortByButtonLabels: RouteSearchParams['sortBy'][] = ['name', 'abbreviation', 'country'];

function Filtering() {
  const { getListEntriesPromise } = Route.useLoaderData(); // https://github.com/TanStack/router/issues/1553#issuecomment-2117127131

  return (
    <div className="p-2">
      <h3 className="mb-4">Filtering</h3>

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
        <List
          getListEntriesPromise={getListEntriesPromise}
          isFetching={false} // todo
        />
      </Suspense>
    </div>
  );
}
