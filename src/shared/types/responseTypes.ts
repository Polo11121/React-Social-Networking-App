type ResponseType<T> = {
  data: T;
};

export type UserType = {
  role: string;
  _id: string;
  name: string;
  email: string;
  __v: number;
};

export type ResponseUserType = ResponseType<{ user: UserType }>;

export type ResponseErrorType = { message: string };
