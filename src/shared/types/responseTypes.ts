import { FiltersType, UserRoleType } from 'shared/types/repeatableTypes';

type PostType = {
  images: string[];
  _id: string;
  description: string;
  createdAt: Date;
  type: string;
};

export type CityType = {
  _id: string;
  city: string;
  location: { type: 'Point'; coordinates: number[] };
  province: string;
};

export type ReportUserType = {
  name: string;
  surname: string;
  profileImage: string;
  _id: string;
};

export type ReportsCountersType = {
  allReports: number;
  newReports: number;
  solvedReports: number;
  myReports: number;
  users: number;
  administrators: number;
};

export type ReportType = {
  _id: string;
  reportId: string;
  reportedUser: ReportUserType;
  reportingUser: ReportUserType;
  admin: ReportUserType;
  createdAt: Date;
  userComment: string;
  adminComment: string;
  reportSolution: string;
  status: 'new' | 'inProgress' | 'solved';
  reason:
    | 'Podszywanie się pod inną osobę'
    | 'Fałszywe konto'
    | 'Fałszywe imię i nazwisko'
    | 'Publikowanie niestosownych treści'
    | 'Prześladowanie lub cyberprzemoc'
    | 'Inny powód';
  result: number;
};

export type UserType = {
  _id: string;
  name: string;
  surname: string;
  profileImage: string;
  backgroundImage: string;
  gender: 'male' | 'female';
  description: string;
  posts: PostType[];
  birthDate: Date;
  hobbies: { text: string; icon: string; _id: string }[];
  workPlace: string;
  middleSchool: string;
  upperSchool: string;
  home: CityType;
  childCity: CityType;
  cities: CityType[];
  phoneNumber: string;
  address: string;
  email: string;
  contactEmail: string;
  interestedGenders: 'males' | 'females' | 'femalesAndMales';
  filters: FiltersType;
  role: UserRoleType;
  matchStatus: { user: string; status: string }[];
  createdAt: Date;
  status: string;
};

export type MessageType = {
  _id: string;
  text: string;
  sender: { profileImage: string; _id: string; name: string; surname: string };
  receiver?: {
    profileImage: string;
    _id: string;
    name: string;
    surname: string;
  };
  isImageLoading?: boolean;
  createdAt: Date;
  images: string[];
  receiverRead?: boolean;
};

export type LastMessagesType = {
  _id: string;
  match: UserType;
  lastMessage: MessageType;
};

export type MatchType = {
  _id: string;
  match: UserType;
  status: 'none' | 'request' | 'match';
};

export type AllMatchesType = {
  matches: MatchType[];
  allCount: number;
  receiveCount: number;
  sendCount: number;
  matchCount: number;
};

export type ResponseUserType = { data: UserType; token: string };

export type ResponseErrorType = { message: string };
