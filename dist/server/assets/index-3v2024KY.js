import { l as listJSON } from "./list-DVwSiydC.js";
import { a as createServerRpc, c as createServerFn } from "../server.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const MIN_DURATION = 1500;
const collator = new Intl.Collator("en-GB", {
  sensitivity: "base"
});
const sortListByField = (list, sortBy) => {
  switch (sortBy) {
    case "name": {
      return list.toSorted((entryA, entryB) => collator.compare(entryA.name, entryB.name));
    }
    case "abbreviation": {
      return list.toSorted((entryA, entryB) => collator.compare(entryA.abbreviation, entryB.abbreviation));
    }
    case "country":
      return list.toSorted((entryA, entryB) => collator.compare(entryA.country, entryB.country));
    default:
      return sortBy;
  }
};
const getListEntries_createServerFn_handler = createServerRpc("src_server-functions_get-list-entries_index_ts--getListEntries_createServerFn_handler", (opts, signal) => {
  return getListEntries.__executeServer(opts, signal);
});
const getListEntries = createServerFn().inputValidator((sortBy) => {
  if (sortBy === null || typeof sortBy !== "string") {
    throw new Error("Invalid or missing sortBy parameter");
  }
  switch (sortBy) {
    case "name":
    case "abbreviation":
    case "country":
      return {
        sortBy
      };
    default:
      throw new Error("Invalid sortBy parameter");
  }
}).handler(getListEntries_createServerFn_handler, async ({
  data: {
    sortBy
  }
}) => {
  const promises = await Promise.all([new Promise((resolve) => resolve(sortListByField(listJSON, sortBy))), new Promise((resolve) => setTimeout(() => resolve(), MIN_DURATION))]).catch((error) => {
    throw new Error("Error", {
      cause: error
    });
  });
  return promises[0];
});
export {
  getListEntries_createServerFn_handler
};
