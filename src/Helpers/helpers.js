export const isFiltersEmpty = (filters, keys = Object.keys(filters)) => {
  if (!filters || keys?.length == 0) return true;

  let isFilterFound = false;

  keys.forEach((key) => {
    if (filters[key]?.length > 0) {
      isFilterFound = true;
      return;
    }
  });

  return !isFilterFound;
};
