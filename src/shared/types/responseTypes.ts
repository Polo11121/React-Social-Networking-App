type ResponseType<T> = {
  data: T;
};

type PostType = {
  images: string[];
  _id: string;
  description: string;
  createdAt: Date;
  type: string;
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
  home: string;
  childCity: string;
  cities: string[];
  phoneNumber: string;
  address: string;
  email: string;
  contactEmail: string;
  interestedGenders: 'males' | 'females' | 'femalesAndMales';
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
};

export type ResponseUserType = ResponseType<{ user: UserType }>;

export type ResponseErrorType = { message: string };
