import { ValidationErrors } from "@/types/validate-type";

// Demo tài khoản học viên
export const DEMO_STUDENT = {
  id: "student1",
  email: "student@example.com",
  password: "password123",
} as const;

// Demo tài khoản giảng viên
export const DEMO_INSTRUCTOR = {
  id: "instructor1",
  email: "instructor@example.com",
  password: "password123",
} as const;

// Giữ DEMO_USER cho tương thích ngược (đóng vai học viên)
export const DEMO_USER = DEMO_STUDENT;

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validatePasswordStrength = (
  password: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Mật khẩu phải có ít nhất 8 ký tự");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Mật khẩu phải chứa ít nhất 1 chữ cái viết thường");
  }

  if (!/\d/.test(password)) {
    errors.push("Mật khẩu phải chứa ít nhất 1 chữ số");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
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

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const validatePasswordChangeForm = (
  data: PasswordChangeData
): Record<keyof PasswordChangeData, string> => {
  const errors: Record<keyof PasswordChangeData, string> = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // Validate current password
  if (!data.currentPassword.trim()) {
    errors.currentPassword = "Mật khẩu hiện tại không được để trống";
  }

  // Validate new password
  if (!data.newPassword.trim()) {
    errors.newPassword = "Mật khẩu mới không được để trống";
  } else {
    const strengthValidation = validatePasswordStrength(data.newPassword);
    if (!strengthValidation.isValid) {
      errors.newPassword = strengthValidation.errors[0]; // Show first error only
    }
  }

  // Validate confirm password
  if (!data.confirmPassword.trim()) {
    errors.confirmPassword = "Xác nhận mật khẩu không được để trống";
  } else if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
  }

  // Check if new password is different from current
  if (
    data.currentPassword &&
    data.newPassword &&
    data.currentPassword === data.newPassword
  ) {
    errors.newPassword = "Mật khẩu mới phải khác mật khẩu hiện tại";
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

// Lưu / lấy / xoá tài khoản giảng viên riêng biệt với học viên
export const setStoredInstructor = (instructor: {
  id: string;
  email: string;
  name: string;
}) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("instructor", JSON.stringify(instructor));
  }
};

export const getStoredInstructor = () => {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("instructor");
    return raw ? JSON.parse(raw) : null;
  }
  return null;
};

export const clearStoredInstructor = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("instructor");
  }
};
