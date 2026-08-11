import { LoginError, RegisterError } from "@/lib/types";

export function mapLoginError(message: string): LoginError {
  const error = message.toLowerCase();
  console.log(error);
  if (error.includes("emailnotfound")) {
    return "emailNotFound";
  }
  if (error.includes("invalid login credentials")) {
    return "invalidLoginCredentials";
  }

  if (error.includes("email not confirmed")) {
    return "emailNotConfirmed";
  }

  if (error.includes("too many requests") || error.includes("rate limit")) {
    return "tooManyRequests";
  }

  return "unableToLogin";
}

export function mapRegisterError(message: string): RegisterError {
  const error = message.toLowerCase();

  if (
    error.includes("emailalreadyregistered") ||
    error.includes("already registered") ||
    error.includes("already exists")
  ) {
    return "emailAlreadyRegistered";
  }

  if (
    error.includes("invalid email") ||
    error.includes("invalid email address")
  ) {
    return "invalidEmail";
  }

  if (
    error.includes("password should be at least") ||
    error.includes("password must") ||
    error.includes("password is too short")
  ) {
    return "weakPassword";
  }

  if (
    error.includes("rate limit") ||
    error.includes("email rate limit exceeded")
  ) {
    return "emailRateLimitExceeded";
  }

  return "unableToCreateAccount";
}
