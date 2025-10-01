/* eslint-disable jsx-a11y/label-has-associated-control */
import { createFileRoute } from '@tanstack/react-router';
import { useActionState } from 'react';

import { getListEntries, type ListEntry } from 'src/server-functions/get-list-entries';

type FormState = {
  fields: {
    term: {
      value: string;
      isValid: boolean;
    };
  };
  calculatedLength?: number;
};

export const Route = createFileRoute('/form-handling')({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: ForHandling,
  ssr: true, // default
  staleTime: 60_000,
  preloadStaleTime: 60_000,
});

async function getStringLength(_: FormState, formData: FormData) {
  const { promise, resolve } = Promise.withResolvers<FormState>();

  const termFieldValue = formData.get('term-field');
  const calculatedLength = termFieldValue?.toString().length ?? 0; // incorrect for emojis

  resolve({
    fields: {
      term: {
        value: termFieldValue?.toString() ?? '',
        isValid: true, // todo
      },
    },
    calculatedLength,
  });

  return promise;
}

function ForHandling() {
  const [formState, formAction, isPending] = useActionState<FormState, FormData>(getStringLength, {
    fields: {
      term: {
        value: '🐱',
        isValid: true,
      },
    },
  });

  return (
    <search className="p-2">
      <form action={formAction} inert={isPending}>
        <div className="mb-2 flex items-center gap-2">
          <label htmlFor="term-field">Pleaser enter a value</label>
          <input
            type="text"
            id="term-field"
            name="term-field"
            defaultValue={formState.fields.term.value}
            className="p-2 text-black"
          />
        </div>
        <button type="submit" className="mb-2 border p-2">
          Submit
        </button>
        <p>
          <output htmlFor="term-field">{formState.calculatedLength}</output>
        </p>
      </form>
    </search>
  );
}
