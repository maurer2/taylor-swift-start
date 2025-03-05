import { createServerFn } from "@tanstack/react-start";
import listJSON from "./list.json";

type ListEntry = {
  name: string;
  abbreviation: string;
  country: string;
};

const MIN_DURATION = 1;

export const getListEntries = createServerFn().handler(async () => {
  const { resolve, promise: promiseList } =
    Promise.withResolvers<ListEntry[]>();

  // const promises = await Promise.all([
  //   promiseList,
  //   new Promise((resolveMinDuration) =>
  //   // setTimeout(() => resolveMinDuration(null), MIN_DURATION)
  //   ),
  // ]).catch((error: unknown) => {
  //   throw new Error("Error", { cause: error });
  // });

  setTimeout(() => {
    resolve(listJSON as ListEntry[]);
  }, 1000);

  return promiseList;
  // return promises[0];
});
