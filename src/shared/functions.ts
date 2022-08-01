export const getTrimmedData = (obj: Record<any, any>) => {
  if (obj && typeof obj === 'object') {
    // eslint-disable-next-line array-callback-return
    Object.keys(obj).map((key) => {
      if (typeof obj[key] === 'object') {
        getTrimmedData(obj[key]);
      } else if (typeof obj[key] === 'string') {
        // eslint-disable-next-line no-param-reassign
        obj[key] = obj[key].trim();
      }
    });
  }
  return obj;
};

export const sortByDate = (date1: Date, date2: Date) =>
  new Date(date2).getTime() - new Date(date1).getTime();
