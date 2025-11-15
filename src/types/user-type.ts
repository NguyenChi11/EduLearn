export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  headline?: string;
  bio?: string;
  language?: string;
  website?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export type AuthErrors = Partial<Record<keyof AuthFormData, string>>;
