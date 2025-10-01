/* eslint-disable jsx-a11y/label-has-associated-control */
import { createFileRoute } from '@tanstack/react-router';
import { useActionState } from 'react';
import { json } from '@tanstack/react-start';

type FormState = {
  fields: {
    term: {
      value: string;
      isValid: boolean;
    };
  };
  calculatedLengths?: [stringLength: number, arrayLength: number, intlSegmenterLength: number];
};

const segmenterAPI = new Intl.Segmenter('en-GB', { granularity: 'grapheme' });

export const Route = createFileRoute('/form-handling')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const formData = await request.formData();
        const termFieldValue = formData.get('term-field')?.toString() ?? '';

        const calculatedLengths: FormState['calculatedLengths'] = [
          termFieldValue.length,
          [...termFieldValue].length,
          [...segmenterAPI.segment(termFieldValue)].length,
        ];

        return json({ calculatedLengths });
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: ForHandling,
  ssr: true, // default
});

async function getStringLength(_: FormState, formData: FormData) {
  const { promise, resolve } = Promise.withResolvers<FormState>();

  const termFieldValue = formData.get('term-field');

  const request = await fetch('/form-handling', {
    body: formData,
    method: 'post',
  });
  const response = await request.json();

  resolve({
    fields: {
      term: {
        value: termFieldValue?.toString() ?? '',
        isValid: true, // todo
      },
    },
    calculatedLengths: response.calculatedLengths,
  });

  return promise;
}

function ForHandling() {
  const [formState, formAction, isPending] = useActionState<FormState, FormData>(getStringLength, {
    fields: {
      term: {
        value: '🐱Hållø👩‍🚀👍',
        isValid: true,
      },
    },
  });

  return (
    <search className="p-2">
      <h1 className="mb-4">Form handling</h1>
      <form action={formAction} inert={isPending} method="post" id="form1">
        <h2 className="mb-2">Server routes (api routes)</h2>
        <div className="mb-2 flex items-center gap-2">
          <label htmlFor="term-field">Pleaser enter a term:</label>
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
        {formState.calculatedLengths?.length ? (
          <output form="form1">
            <code>
              <pre>{formState.calculatedLengths.toString().replaceAll(',', ', ')}</pre>
            </code>
            <span>(string length, array, length, number of graphemes)</span>
          </output>
        ) : null}
      </form>
      {/*
      <h2 className="mb-2">Server functions directly</h2>
      <p>todo</p> */}
    </search>
  );
}
