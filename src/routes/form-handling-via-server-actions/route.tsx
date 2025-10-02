/* eslint-disable jsx-a11y/label-has-associated-control */
import { createFileRoute } from '@tanstack/react-router';
import { useActionState } from 'react';

import { getMbStrlen } from '../../server-functions/getMbStrlen';

type FormState = {
  fields: {
    term: {
      value: string;
      isValid: boolean;
    };
  };
  calculatedLengths?: readonly [
    stringLength: number,
    stringSplitLength: number,
    arrayLength: number,
    intlSegmenterLength: number,
  ];
};

export const Route = createFileRoute('/form-handling-via-server-actions')({
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  component: FormHandlingViaServerActions,
  ssr: true, // default
});

// todo find out how to call it directly from action attribute
async function getMbStrlenIntermediateFunction(_: FormState, formData: FormData) {
  const { promise, resolve } = Promise.withResolvers<FormState>();

  const { calculatedLengths, termFieldValue } = await getMbStrlen({ data: formData });

  resolve({
    fields: {
      term: {
        value: termFieldValue,
        isValid: true, // todo
      },
    },
    calculatedLengths,
  });

  return promise;
}

function FormHandlingViaServerActions() {
  const [formState, formAction, isPending] = useActionState<FormState, FormData>(
    getMbStrlenIntermediateFunction,
    {
      fields: {
        term: {
          value: '🐱Hållø👩‍🚀👍',
          isValid: true,
        },
      },
    },
  );

  return (
    <search className="p-2">
      <h1 className="mb-4" id="page-title">
        Form handling via Server action
      </h1>
      <form
        action={formAction}
        inert={isPending}
        method="post"
        id="form"
        aria-labelledby="page-title"
      >
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
          <output form="form">
            <code>
              <pre>{formState.calculatedLengths.toString().replaceAll(',', ', ')}</pre>
            </code>
            <span>(string length, string split length, array length, number of graphemes)</span>
          </output>
        ) : null}
      </form>
    </search>
  );
}
