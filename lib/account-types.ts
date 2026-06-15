export type AccountRole = "client" | "admin";

export type AuthProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
};

export type AuthUser = AuthProfile & {
  id: string;
  accountRole: AccountRole;
  createdAt: string;
};

export type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
