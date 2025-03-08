import { useSuspenseQuery } from "@tanstack/react-query";

import { listEntriesQueryOptions } from "~/server-functions/get-list-entries";

export function List() {
  const { data: list, isFetching } = useSuspenseQuery(listEntriesQueryOptions);

  return (
    <>
      {isFetching ? <p>Is refetching</p> : null}
      <div aria-live="polite" aria-busy={isFetching}>
        <pre>{JSON.stringify(list, null, 4)}</pre>
      </div>
    </>
  );
}
