type IndexedObject = Record<string, unknown>;

const cloneDeep = (original: unknown): unknown => {
  if (original instanceof Date) {
    return new Date(original.getTime());
  }

  if (original instanceof RegExp) {
    return new RegExp(original);
  }

  if (Array.isArray(original)) {
    return original.map(cloneDeep);
  }

  if (typeof original === 'object' && original !== null) {
    const clone: IndexedObject = {};
    Object.entries(original).forEach(([key, value]) => {
      clone[key] = cloneDeep(value);
    });
    return clone;
  }

  return original;
};

export default cloneDeep;
