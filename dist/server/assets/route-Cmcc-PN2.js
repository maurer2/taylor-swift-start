import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { use, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { a as Route, l as listEntriesQueryOptions } from "./router-DZheszii.js";
import "@tanstack/react-router-with-query";
import "@tanstack/react-router-devtools";
import "@tanstack/react-query-devtools";
import "./list-DVwSiydC.js";
import "../server.js";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
function List({ listEntriesQuery }) {
  const { isFetching, promise } = listEntriesQuery;
  const list = use(promise);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isFetching ? /* @__PURE__ */ jsx("p", { children: "Is refetching" }) : null,
    /* @__PURE__ */ jsx("div", { "aria-live": "polite", "aria-busy": isFetching, children: /* @__PURE__ */ jsx("pre", { children: JSON.stringify(list, null, 4) }) })
  ] });
}
const sortByButtonLabels = ["name", "abbreviation", "country"];
function FilteringPrefetchInRender() {
  const {
    sortBy
  } = Route.useSearch();
  const listEntriesQuery = useQuery(listEntriesQueryOptions(sortBy));
  return /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-4", children: "Filtering prefetch in render" }),
    /* @__PURE__ */ jsxs("search", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("h4", { id: "filter-sort-by-title", children: "Sort by" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-4", role: "group", "aria-describedby": "filter-sort-by-title", children: sortByButtonLabels.map((sortByButton) => /* @__PURE__ */ jsx(Link, { to: ".", search: {
        sortBy: sortByButton
      }, className: "uppercase", activeProps: {
        className: "bg-red-500"
      }, children: sortByButton }, sortByButton)) })
    ] }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("p", { children: "Loading list" }), children: /* @__PURE__ */ jsx(List, { listEntriesQuery }) })
  ] });
}
export {
  FilteringPrefetchInRender as component
};
