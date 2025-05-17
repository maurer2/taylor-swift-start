import { createServerFn } from '@tanstack/react-start';
import { queryOptions } from '@tanstack/react-query';

import listJSON from './list.json';

export type ListEntry = {
  name: string;
  abbreviation: string;
  country: string;
};

type GetListEntriesParams = {
  sortBy: Lowercase<keyof ListEntry>;
};

const MIN_DURATION = 1500;
const collator = new Intl.Collator('en-GB', { sensitivity: 'base' });

const sortListByField = (
  list: ListEntry[],
  sortBy: GetListEntriesParams['sortBy'],
): ListEntry[] => {
  switch (sortBy) {
    case 'name': {
      return list.toSorted((entryA, entryB) => collator.compare(entryA.name, entryB.name));
    }
    case 'abbreviation': {
      return list.toSorted((entryA, entryB) =>
        collator.compare(entryA.abbreviation, entryB.abbreviation),
      );
    }
    case 'country':
      return list.toSorted((entryA, entryB) => collator.compare(entryA.country, entryB.country));
    default:
      return sortBy satisfies never;
  }
};

export const getListEntries = createServerFn()
  .validator((sortBy: unknown): GetListEntriesParams => {
    // if (sortBy === null || typeof sortBy !== "string") {
    //   throw new Error("Invalid or missing sortBy parameter");
    // }

    switch (sortBy) {
      case 'name':
      case 'abbreviation':
      case 'country':
        return { sortBy };
      default:
        throw new Error('Invalid sortBy parameter');
    }
  })
  .handler(async ({ data: { sortBy } }) => {
    const promises = await Promise.all([
      new Promise<ListEntry[]>((resolve) => resolve(sortListByField(listJSON, sortBy))),
      new Promise<void>((resolve) => setTimeout(() => resolve(), MIN_DURATION)),
    ]).catch((error: unknown) => {
      throw new Error('Error', { cause: error });
    });

    return promises[0];
  });

export const listEntriesQueryOptions = (sortBy: string) =>
  queryOptions({
    queryKey: ['list-entries', sortBy] as const,
    // key for param for server fn needs to be called "data"
    queryFn: async () => getListEntries({ data: sortBy }),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
