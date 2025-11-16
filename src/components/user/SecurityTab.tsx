"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Typography from "@/components/ui/Typography";
import {
  validatePasswordChangeForm,
  PasswordChangeData,
} from "@/utils/auth-utils";
import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";

interface SecurityTabProps {
  onPasswordChange?: () => void;
}

export default function SecurityTab({ onPasswordChange }: SecurityTabProps) {
  const [formData, setFormData] = useState<PasswordChangeData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<
    Record<keyof PasswordChangeData, string>
  >({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange =
    (field: keyof PasswordChangeData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }

      // Clear success message when user makes changes
      if (successMessage) {
        setSuccessMessage("");
      }
    };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validatePasswordChangeForm(formData);
    setErrors(validationErrors);

    // Check if there are any errors
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to change password
      // In a real app, this would be an actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, we'll just verify the current password matches the demo password
      if (formData.currentPassword !== "password123") {
        throw new Error("Mật khẩu hiện tại không đúng");
      }

      // Success
      setSuccessMessage("Mật khẩu đã được cập nhật thành công!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Call the callback if provided
      onPasswordChange?.();
    } catch (error: unknown) {
      const err = error as Error;
      if (err.message === "Mật khẩu hiện tại không đúng") {
        setErrors((prev) => ({ ...prev, currentPassword: err.message }));
      } else {
        setErrors((prev) => ({
          ...prev,
          currentPassword: "Có lỗi xảy ra. Vui lòng thử lại.",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setSuccessMessage("");
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <Typography variant="h2" className="mb-1">
          Bảo mật tài khoản
        </Typography>
        <Typography variant="small">
          Đổi mật khẩu định kỳ để giữ an toàn cho tài khoản của bạn.
        </Typography>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <Typography
            variant="small"
            className="text-green-800 dark:text-green-200"
          >
            {successMessage}
          </Typography>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showPasswords.current ? "text" : "password"}
              value={formData.currentPassword}
              onChange={handleInputChange("currentPassword")}
              placeholder="Nhập mật khẩu hiện tại"
              className={
                errors.currentPassword
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPasswords.current ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <div className="flex items-center gap-1 mt-1">
              <XCircle className="w-4 h-4 text-red-500" />
              <Typography
                variant="small"
                className="text-red-600 dark:text-red-400"
              >
                {errors.currentPassword}
              </Typography>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="newPassword">Mật khẩu mới</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPasswords.new ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleInputChange("newPassword")}
              placeholder="Ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
              className={
                errors.newPassword ? "border-red-500 focus:ring-red-500" : ""
              }
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPasswords.new ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <div className="flex items-center gap-1 mt-1">
              <XCircle className="w-4 h-4 text-red-500" />
              <Typography
                variant="small"
                className="text-red-600 dark:text-red-400"
              >
                {errors.newPassword}
              </Typography>
            </div>
          )}
          {!errors.newPassword && formData.newPassword && (
            <div className="mt-2 space-y-1">
              <Typography
                variant="small"
                className="text-slate-600 dark:text-slate-400"
              >
                Yêu cầu mật khẩu mạnh:
              </Typography>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div
                  className={`flex items-center gap-1 ${
                    formData.newPassword.length >= 8
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-500 dark:text-slate-500"
                  }`}
                >
                  {formData.newPassword.length >= 8 ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  Ít nhất 8 ký tự
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    /[A-Z]/.test(formData.newPassword)
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-500 dark:text-slate-500"
                  }`}
                >
                  {/[A-Z]/.test(formData.newPassword) ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  Chữ hoa
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    /[a-z]/.test(formData.newPassword)
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-500 dark:text-slate-500"
                  }`}
                >
                  {/[a-z]/.test(formData.newPassword) ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  Chữ thường
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    /\d/.test(formData.newPassword)
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-500 dark:text-slate-500"
                  }`}
                >
                  {/\d/.test(formData.newPassword) ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  Chữ số
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-500 dark:text-slate-500"
                  } col-span-2`}
                >
                  {/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  Ký tự đặc biệt (!@#$%^&amp;*(),.?&quot;:&#123;&#125;|&lt;&gt;)
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="confirmNewPassword">Xác nhận mật khẩu mới</Label>
          <div className="relative">
            <Input
              id="confirmNewPassword"
              type={showPasswords.confirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              placeholder="Nhập lại mật khẩu mới"
              className={
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPasswords.confirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="flex items-center gap-1 mt-1">
              <XCircle className="w-4 h-4 text-red-500" />
              <Typography
                variant="small"
                className="text-red-600 dark:text-red-400"
              >
                {errors.confirmPassword}
              </Typography>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </Button>
        </div>
      </form>
    </div>
  );
}
