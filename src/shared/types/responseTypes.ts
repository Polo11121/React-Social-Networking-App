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
  description: string;
  posts: PostType[];
  birthDate: Date;
};

export type ResponseUserType = ResponseType<{ user: UserType }>;

export type ResponseErrorType = { message: string };
