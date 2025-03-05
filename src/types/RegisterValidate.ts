// Define interfaces based on the Swagger UI specification
export interface OtpData {
    email: string;
    otp: string;
}

export interface OtpErrors {
    email?: string;
    otp?: string;
}