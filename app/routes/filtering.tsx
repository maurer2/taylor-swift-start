import { createFileRoute } from "@tanstack/react-router";
import { getListEntries } from "~/server-functions/get-list-entries";
import { useServerFn } from "@tanstack/react-start";
import { use } from "react";

export const Route = createFileRoute("/filtering")({
  component: Filtering,
});

function Filtering() {
  const getListEntriesFn = useServerFn(getListEntries);
  const list = use(getListEntriesFn()); // infinite loop

  console.log("list", list);

  return (
    <div className="p-2">
      <h3>Filtering</h3>

      <search>Filter tags</search>

      <hr />

      <pre>{JSON.stringify(list, null, 4)}</pre>
    </div>
  );
}
