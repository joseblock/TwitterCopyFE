import { schema } from 'normalizr';

export const citation = new schema.Entity(
    'citations',
);

export const citations = new schema.Array(citation);
