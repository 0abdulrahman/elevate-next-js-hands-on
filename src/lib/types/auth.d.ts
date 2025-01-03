declare type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  photo?: string;
  blocked: boolean;
  id: string;
} & DatabaseFields;

declare type LoginResponse = {
  token: string;
  user: User;
};

declare type RegisterFields = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  passwordConfirm: string;
};
