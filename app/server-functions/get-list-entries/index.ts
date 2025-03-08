import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

import listJSON from "./list.json";

export type ListEntry = {
  name: string;
  abbreviation: string;
  country: string;
};

type GetListEntriesParams = {
  sortBy: Lowercase<keyof ListEntry>;
};

const MIN_DURATION = 2500;

export const getListEntries = createServerFn({
  method: "GET",
})
  // .validator((sortBy: unknown): GetListEntriesParams => {
  //   if (sortBy === null || typeof sortBy !== "string") {
  //     throw new Error("Invalid or missing sortBy parameter");
  //   }

  //   switch (sortBy) {
  //     case "name":
  //     case "abbreviation":
  //     case "country":
  //       return { sortBy };
  //     default:
  //       throw new Error("Invalid sortBy parameter");
  //   }
  // })

  .validator((sortBy: unknown): GetListEntriesParams => {
    return { sortBy: "name" };
  })
  .handler(async ({ data }) => {
    console.log("data", data.sortBy);
    const promises = await Promise.all([
      new Promise<ListEntry[]>((resolve) => resolve(listJSON as ListEntry[])),
      new Promise<void>((resolve) => setTimeout(() => resolve(), MIN_DURATION)),
    ]).catch((error: unknown) => {
      throw new Error("Error", { cause: error });
    });

    return promises[0];
  });

export const listEntriesQueryOptions = queryOptions({
  queryKey: ["list"],
  queryFn: async (sortBy) => getListEntries(sortBy),
  staleTime: 10000,
  refetchOnWindowFocus: false,
});
