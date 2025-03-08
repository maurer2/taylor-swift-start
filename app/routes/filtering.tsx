import { createFileRoute } from "@tanstack/react-router";
// import { useServerFn } from "@tanstack/react-start";
import { listEntriesQueryOptions } from "~/server-functions/get-list-entries";
import { List } from "~/components/List";

// import { use } from "react";
import { Suspense } from "react";

export const Route = createFileRoute("/filtering")({
  component: Filtering,
  beforeLoad: async ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(listEntriesQueryOptions);

    return {
      listEntriesQueryOptions,
    };
  },
  // loader: async ({ context: { queryClient, listEntriesQueryOptions } }) => {
  //   queryClient.prefetchQuery(listEntriesQueryOptions);
  // },
});

function Filtering() {
  // const getListEntriesPromise = useServerFn(getListEntries);
  // const list = use(getListEntriesFn()); // infinite loop
  // const { list } = Route.useLoaderData();
  // const { isFetching } = Route.useMatch();
  // const { listPromise } = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3>Filtering</h3>

      <search>Filter tags</search>

      <hr />

      <Suspense fallback={<p>Loading</p>}>
        <List />
      </Suspense>
    </div>
  );
}
