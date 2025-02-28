export interface FormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
  phone: string;
  address: string;
}

export interface FormErrors {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  role?: string;
  phone?: string;
  address?: string;
}