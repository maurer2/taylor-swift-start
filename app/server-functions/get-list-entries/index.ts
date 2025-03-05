import { createServerFn } from "@tanstack/react-start";
import listJSON from "./list.json";

type ListEntry = {
  name: string;
  abbreviation: string;
  country: string;
};

const MIN_DURATION = 2000;

export const getListEntries = createServerFn().handler(async () => {
  const promises = await Promise.all([
    new Promise<ListEntry[]>((resolve) => resolve(listJSON as ListEntry[])),
    new Promise<void>((resolve) => setTimeout(() => resolve(), MIN_DURATION)),
  ]).catch((error: unknown) => {
    throw new Error("Error", { cause: error });
  });

  return promises[0];
});
