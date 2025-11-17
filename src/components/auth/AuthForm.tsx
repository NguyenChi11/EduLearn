import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import PasswordField from "./PasswordField";
import AuthToggle from "./AuthToggle";
import { Mail, ArrowRight } from "lucide-react";
import { AuthFormData, AuthErrors } from "@/types/user-type";

interface AuthFormProps {
  isLogin: boolean;
  formData: AuthFormData;
  errors: AuthErrors;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggle: () => void;
  demoEmailPlaceholder?: string;
  demoEmailHint?: string;
}

export default function AuthForm({
  isLogin,
  formData,
  errors,
  isLoading,
  onInputChange,
  onSubmit,
  onToggle,
  demoEmailPlaceholder,
  demoEmailHint,
}: AuthFormProps) {
  const isFormValid = isLogin
    ? !!formData.email && !!formData.password && !isLoading
    : !!formData.name &&
      !!formData.email &&
      !!formData.password &&
      !!formData.confirmPassword &&
      !isLoading;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!isLogin && (
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Nhập tên của bạn"
          label="Tên đầy đủ"
          error={errors.name}
          disabled={isLoading}
        />
      )}

      <Input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={onInputChange}
        placeholder={
          isLogin
            ? demoEmailPlaceholder ?? "user@example.com"
            : "your@email.com"
        }
        label="Email"
        error={errors.email}
        disabled={isLoading}
        icon={Mail}
        hint={isLogin ? demoEmailHint : undefined}
      />

      <PasswordField
        id="password"
        name="password"
        value={formData.password}
        onChange={onInputChange}
        label="Mật khẩu"
        error={errors.password}
        disabled={isLoading}
      />
      {isLogin && (
        <p className="text-xs text-slate-500 dark:text-slate-400 -mt-3">
          Demo: password123
        </p>
      )}

      {!isLogin && (
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onInputChange}
          label="Xác nhận mật khẩu"
          error={errors.confirmPassword}
          disabled={isLoading}
        />
      )}

      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!isFormValid}
        className="w-full"
      >
        {isLogin ? "Đăng nhập" : "Đăng ký"}
        {!isLoading && <ArrowRight className="w-4 h-4" />}
      </Button>

      <AuthToggle isLogin={isLogin} onToggle={onToggle} />
    </form>
  );
}
