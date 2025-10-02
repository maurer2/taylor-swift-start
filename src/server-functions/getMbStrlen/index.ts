import { createServerFn } from '@tanstack/react-start';
// import z from 'zod';

type CalculatedLengths = [
  stringLength: number,
  stringSplitLength: number,
  arrayLength: number,
  intlSegmenterLength: number,
];

type GetMbStrlenParams = {
  termFieldValue: string;
};

const segmenterAPI = new Intl.Segmenter('en-GB', { granularity: 'grapheme' });

export const getMbStrlen = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown): GetMbStrlenParams => {
    if (!(data instanceof FormData)) {
      throw new Error('Invalid data types');
    }

    const termFieldValue = (data.get('term-field') as string) ?? ''; // ignore data potentially being a file blob

    return {
      termFieldValue,
    };
  })
  .handler(async ({ data }) => {
    const { termFieldValue } = data;

    const calculatedLengths: CalculatedLengths = [
      termFieldValue.length,
      termFieldValue.split('').length,
      [...termFieldValue].length,
      [...segmenterAPI.segment(termFieldValue)].length,
    ];

    return { termFieldValue, calculatedLengths };
  });
