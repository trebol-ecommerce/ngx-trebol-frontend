export function compareObjectsForSort(a: any, b: any, sortBy: string, order = 'asc'): number {
  if ((sortBy in a) &&
    (sortBy in b) &&
    a.hasOwnProperty(sortBy) &&
    b.hasOwnProperty(sortBy)) {
    const valueInA = (typeof a[sortBy] === 'string') ? a[sortBy].toLowerCase() : a[sortBy];
    const valueInB = (typeof b[sortBy] === 'string') ? b[sortBy].toLowerCase() : b[sortBy];
    switch (order) {
      case 'asc':
        if (valueInA < valueInB) { return -1; }
        if (valueInA > valueInB) { return 1; }
        return 0;
      case 'desc':
        if (valueInA < valueInB) { return 1; }
        if (valueInA > valueInB) { return -1; }
        return 0;
      default:
        if (valueInA < valueInB) { return 1; }
        if (valueInA > valueInB) { return -1; }
        return 0;
    }
  }
  return 0;
}
