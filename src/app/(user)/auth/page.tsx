"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForm from "@/components/auth/AuthForm";
import { DEMO_USER, setStoredUser } from "@/utils/auth-utils";
import { User, AuthFormData, AuthErrors } from "@/types/user-type";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<AuthErrors>({});
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setIsLogin(searchParams.get("mode") !== "signup");
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AuthErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          setErrors({
            email: !formData.email ? "Email không được để trống" : undefined,
            password: !formData.password
              ? "Mật khẩu không được để trống"
              : undefined,
          });
          return;
        }

        if (
          formData.email === DEMO_USER.email &&
          formData.password === DEMO_USER.password
        ) {
          const user: User = {
            id: DEMO_USER.id,
            email: formData.email,
            name: "Demo User",
          };
          setStoredUser(user);
          router.push("/courses");
        } else {
          setErrors({ email: "Email hoặc mật khẩu không chính xác" });
        }
      } else {
        const errs: AuthErrors = {};
        if (!formData.name.trim()) errs.name = "Tên không được để trống";
        if (!formData.email.trim()) errs.email = "Email không được để trống";
        else if (!/.+@.+\..+/.test(formData.email))
          errs.email = "Email không hợp lệ";
        if (formData.password.length < 6)
          errs.password = "Mật khẩu phải có ít nhất 6 ký tự";
        if (formData.confirmPassword !== formData.password)
          errs.confirmPassword = "Mật khẩu không khớp";

        if (Object.values(errs).some(Boolean)) {
          setErrors(errs);
          return;
        }

        const user: User = {
          id: `user_${Date.now()}`,
          email: formData.email,
          name: formData.name,
        };
        setStoredUser(user);
        router.push("/courses");
      }
    } catch {
      setErrors({ email: "Lỗi hệ thống, thử lại sau" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", name: "", confirmPassword: "" });
    setErrors({});
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="EduLearn"
        subtitle={isLogin ? "Đăng nhập để tiếp tục" : "Tạo tài khoản mới"}
      />
      <AuthForm
        isLogin={isLogin}
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onToggle={handleToggle}
      />
    </AuthLayout>
  );
}
