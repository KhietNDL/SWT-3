export interface FormData {
  userName: string;
  fullname: string;
  // DoB: string;
  email: string;
  phone: string;
  address: string;
  passwordHash: string;
  confirmPassword: string;
  roleName: string;
}

export interface FormErrors {
  userName?: string;
  fullname?: string;
  // DoB?: string;
  email?: string;
  phone?: string;
  address?: string;
  passwordHash?: string;
  confirmPassword?: string;
  roleName?: string; 
}