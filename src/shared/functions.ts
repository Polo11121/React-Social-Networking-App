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

export const getAge = (dateString: Date) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
};

export const formatPostDate = (date: Date) =>
  new Date(date).toLocaleDateString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

export const formatProfileDetailsDate = (date: Date) =>
  new Date(date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

export const formatInterestedGenders = (gender: string) => {
  if (gender === 'males') {
    return 'Mężczyźni';
  }
  if (gender === 'females') {
    return 'Kobiety';
  }
  if (gender === 'femalesAndMales') {
    return 'Kobiety i Mężczyźni';
  }

  return '';
};

export const goToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

export const areEqual = <T>(array1: T[], array2: T[]) => {
  if (array1.length === array2.length) {
    return array1.every((element) => {
      if (array2.includes(element)) {
        return true;
      }

      return false;
    });
  }

  return false;
};

export const capitalizeFirstLetter = (word?: string) =>
  word && word.charAt(0).toUpperCase() + word.slice(1);
