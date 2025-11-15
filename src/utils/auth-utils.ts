import { User } from "@/types/user-type";
import { ValidationErrors } from "@/types/validate-type";

export const DEMO_USER = {
  id: "user1",
  email: "user@example.com",
  password: "password123",
} as const;

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateLoginForm = (
  email: string,
  password: string
): ValidationErrors => {
  const errors: ValidationErrors = {
    name: "",
  };

  if (!email.trim()) {
    errors.email = "Email không được để trống";
  } else if (!validateEmail(email)) {
    errors.email = "Email không hợp lệ";
  }

  if (!password.trim()) {
    errors.password = "Mật khẩu không được để trống";
  } else if (!validatePassword(password)) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  }

  return errors;
};

export const setStoredUser = (user: {
  id: string;
  email: string;
  name: string;
}) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getStoredUser = () => {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  }
  return null;
};

export const clearStoredUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};
