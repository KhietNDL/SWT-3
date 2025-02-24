export interface FormData {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  role?: string;
  phone?: string;
}