/* eslint-disable  */
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

export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

export const formatShortDate = (date: Date) =>
  new Date(date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

export const formatProfileDetailsDate = (date: Date) =>
  new Date(date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

export const formatImageUrl = (imageUrl?: string) =>
  process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_API_KEY}/${imageUrl}`
    : imageUrl;

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

export const getFullName = (name?: string, surname?: string) =>
  `${name} ${surname}`;

export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const formatDataTestId = (text: string) => text.split(' ').join('-');

export const adjustColor = (color: string, amount: number) =>
  '#' +
  color
    .replace(/^#/, '')
    .replace(/../g, (color) =>
      (
        '0' +
        Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
      ).substr(-2)
    );

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

export const formatReportReason = (reason: string) => {
  if (reason === 'impersonation') {
    return 'Podszywanie się pod inną osobę';
  }
  if (reason === 'fakeAccount') {
    return 'Fałszywe konto';
  }
  if (reason === 'fakeName') {
    return 'Fałszywe imię i nazwisko';
  }
  if (reason === 'inappropriateContent') {
    return 'Publikowanie niestosownych treści';
  }
  if (reason === 'cyberbullying') {
    return 'Prześladowanie lub cyberprzemoc';
  }
  if (reason === 'otherReason') {
    return 'Inny powód';
  }

  return '';
};

export const formatReportSolution = (reason: string) => {
  if (reason === 'closeReport') {
    return 'Zamknięto zgłoszenie';
  }
  if (reason === 'closeReportAndBlockUser') {
    return 'Zamknięto zgłoszenie i zablokowano użytkownika';
  }

  return '';
};

export const formatUserAccountStatus = (status: string) => {
  if (status === 'active') {
    return 'Aktywne';
  }
  if (status === 'inactive') {
    return 'Niektywne';
  }
  if (status === 'blocked') {
    return 'Zablokowane';
  }
  if (status === 'noConfirmation') {
    return 'Niepotwierdzone';
  }

  return '';
};

export const formatReportStatus = (status: string) => {
  if (status === 'new') {
    return 'Nowe';
  }
  if (status === 'inProgress') {
    return 'W trakcie';
  }
  if (status === 'solved') {
    return 'Zamknięte';
  }

  return '';
};
