export const interestedGendersOptions = [
  { label: 'Kobiety', value: 'females' },
  { label: 'Mężczyzni', value: 'males' },
  { label: 'Kobiety i Mężczyźni ', value: 'femalesAndMales' },
];

export const gendersOptions = [
  { label: 'Kobieta', value: 'female' },
  { label: 'Mężczyzna', value: 'male' },
];

export const ageOptions = [
  { label: '18-26', value: '18-26' },
  { label: '27-34', value: '27-34' },
  { label: '35-44', value: '35-44' },
  { label: '45-54', value: '45-54' },
  { label: '55-64', value: '55-64' },
];

export const cityMaxDistance = [
  { label: '0km', value: '0' },
  {
    label: '10km',
    value: '10',
  },
  {
    label: '50km',
    value: '50',
  },
  {
    label: '100km',
    value: '100',
  },
  {
    label: '200km',
    value: '200',
  },
  {
    label: '300km',
    value: '300',
  },
];

export const reportReasonOptions = [
  {
    label: 'Podszywanie się pod inną osobę',
    value: 'impersonation',
  },
  { label: 'Fałszywe konto', value: 'fakeAccount' },
  { label: 'Fałszywe imię i nazwisko', value: 'fakeName' },
  {
    label: 'Publikowanie niestosownych treści',
    value: 'inappropriateContent',
  },
  {
    label: 'Prześladowanie lub cyberprzemoc',
    value: 'cyberbullying',
  },
  { label: 'Inny powód', value: 'otherReason' },
];

export const solveReportOptions = [
  {
    label: 'Zamknij zgłoszenie',
    value: 'closeReport',
  },
  {
    label: 'Zamknij zgłoszenie i zablokuj użytkownika',
    value: 'closeReportAndBlockUser',
  },
];

export const reportStatusOptions = [
  {
    label: 'Wszystkie',
    value: '',
  },
  {
    label: 'W trakcie',
    value: 'inProgress',
  },
  { label: 'Zamknięte', value: 'solved' },
];

export const userAccountStatusOptions = [
  {
    label: 'Każdy',
    value: '',
  },
  {
    label: 'Aktywne',
    value: 'active',
  },
  { label: 'Nieaktywne', value: 'inactive' },
  { label: 'Zablokowane', value: 'blocked' },
  { label: 'Niepotwierdzone', value: 'noConfirmation' },
];
