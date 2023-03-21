export const isArray = (item: unknown): item is unknown[] =>
  Array.isArray(item);
