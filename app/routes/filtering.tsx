import { createFileRoute } from "@tanstack/react-router";
import { getListEntries } from "~/server-functions/get-list-entries";
// import { useServerFn } from "@tanstack/react-start";
// import { use } from "react";

export const Route = createFileRoute("/filtering")({
  component: Filtering,
  async loader() {
    const list = await getListEntries();

    return {
      list,
    };
  },
  staleTime: 0,
});

function Filtering() {
  // const getListEntriesFn = useServerFn(getListEntries);
  // const list = use(getListEntriesFn()); // infinite loop
  const { list } = Route.useLoaderData();
  const { isFetching } = Route.useMatch();

  return (
    <div className="p-2">
      <h3>Filtering</h3>

      <search>Filter tags</search>

      <hr />

      {isFetching ? <p>Loading</p> : null}
      {!isFetching ? (
        <div aria-live="polite" aria-busy={isFetching}>
          <pre>{JSON.stringify(list, null, 4)}</pre>
        </div>
      ) : null}
    </div>
  );
}
