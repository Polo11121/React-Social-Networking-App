import { FiltersType } from 'shared/types/repeatableTypes';

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
  matchStatus: { user: string; status: string }[];
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

export type ResponseUserType = { data: UserType };

export type ResponseErrorType = { message: string };
