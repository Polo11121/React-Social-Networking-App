type ResponseType<T> = {
  data: T;
};

export type UserType = {
  _id: string;
  name: string;
  surname: string;
  profileImage: string;
  backgroundImage: string;
};

export type ResponseUserType = ResponseType<{ user: UserType }>;

export type ResponseErrorType = { message: string };
