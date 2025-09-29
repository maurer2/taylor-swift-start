import { use } from 'react';

import type { ListEntry } from 'src/server-functions/get-list-entries';

type ListProps = {
  getListEntriesPromise: Promise<ListEntry[]>;
  isFetching: boolean;
};

export function List({ getListEntriesPromise, isFetching }: ListProps) {
  const list = use(getListEntriesPromise);

  return (
    <>
      {isFetching ? <p>Is refetching</p> : null}
      <div aria-live="polite" aria-busy={isFetching}>
        <pre>{JSON.stringify(list, null, 4)}</pre>
      </div>
    </>
  );
}
