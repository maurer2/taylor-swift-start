import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

const parentRoute = getRouteApi('/filtering-with-usesuspense-query');

export function List() {
  const { queryOptionsListEntries } = parentRoute.useRouteContext();
  const { data: list, isFetching } = useSuspenseQuery(queryOptionsListEntries);
  // const { sortBy } = parentRoute.useSearch();

  return (
    <>
      {isFetching ? <p>Is refetching</p> : null}
      <div aria-live="polite" aria-busy={isFetching}>
        <pre>{JSON.stringify(list, null, 4)}</pre>
      </div>
    </>
  );
}
