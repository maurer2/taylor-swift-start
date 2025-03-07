import { useSuspenseQuery } from "@tanstack/react-query";
import {
  // getListEntries,
  listEntriesQuery,
} from "~/server-functions/get-list-entries";

// export const listEntriesQuery = (id: string) =>
//   queryOptions({
//     queryKey: ["list"],
//     queryFn: async () => getListEntries(),
//     staleTime: 0,
//   });

export function List() {
  const { data: list, isFetching } = useSuspenseQuery(listEntriesQuery);

  return (
    <>
      {isFetching ? <p>Is refetching</p> : null}
      <div aria-live="polite" aria-busy={isFetching}>
        <pre>{JSON.stringify(list, null, 4)}</pre>
      </div>
    </>
  );
}
