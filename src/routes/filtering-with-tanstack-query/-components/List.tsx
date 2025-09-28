import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

import { listEntriesQueryOptions } from 'src/server-functions/get-list-entries';

const parentRoute = getRouteApi('/filtering-with-tanstack-query');

export function List() {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { sortBy } = parentRoute.useSearch() as { sortBy: string }; // https://github.com/TanStack/router/issues/4560

  const { data: list, isFetching } = useSuspenseQuery(listEntriesQueryOptions(sortBy));

  return (
    <>
      {isFetching ? <p>Is refetching</p> : null}
      <div aria-live="polite" aria-busy={isFetching}>
        <pre>{JSON.stringify(list, null, 4)}</pre>
      </div>
    </>
  );
}
