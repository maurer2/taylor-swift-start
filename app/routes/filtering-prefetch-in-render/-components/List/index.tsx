import { use } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';

import type { ListEntry } from '~/server-functions/get-list-entries';

type ListProps = {
  listEntriesQuery: UseQueryResult<ListEntry[]>;
};

export function List({ listEntriesQuery }: ListProps) {
  const { isFetching, promise } = listEntriesQuery;
  const list = use(promise);

  return (
    <>
      {isFetching ? <p>Is refetching</p> : null}
      <div aria-live="polite" aria-busy={isFetching}>
        <pre>{JSON.stringify(list, null, 4)}</pre>
      </div>
    </>
  );
}
