"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthPageLayout from "@/components/auth/AuthPageLayout";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForm from "@/components/auth/AuthForm";
import AuthTabs from "@/components/auth/AuthTabs";
import {
  DEMO_STUDENT,
  DEMO_INSTRUCTOR,
  setStoredUser,
  setStoredInstructor,
} from "@/utils/auth-utils";
import { User, AuthFormData, AuthErrors } from "@/types/user-type";

type AuthRole = "student" | "instructor";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeRole, setActiveRole] = useState<AuthRole>("student");
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

    const roleParam = searchParams.get("role");
    if (roleParam === "student" || roleParam === "instructor") {
      setActiveRole(roleParam);
    }
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

        if (activeRole === "student") {
          if (
            formData.email === DEMO_STUDENT.email &&
            formData.password === DEMO_STUDENT.password
          ) {
            const user: User = {
              id: DEMO_STUDENT.id,
              email: formData.email,
              name: "Demo Student",
            };
            setStoredUser(user);
            router.push("/courses");
          } else {
            setErrors({ email: "Email hoặc mật khẩu không chính xác" });
          }
        } else {
          if (
            formData.email === DEMO_INSTRUCTOR.email &&
            formData.password === DEMO_INSTRUCTOR.password
          ) {
            const instructor: User = {
              id: DEMO_INSTRUCTOR.id,
              email: formData.email,
              name: "Demo Instructor",
            };
            setStoredInstructor(instructor);
            router.push("/home-instructor");
          } else {
            setErrors({
              email: "Email hoặc mật khẩu giảng viên không chính xác",
            });
          }
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

        if (activeRole === "student") {
          setStoredUser(user);
          router.push("/courses");
        } else {
          setStoredInstructor(user);
          router.push("/home-instructor");
        }
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

  const title =
    activeRole === "student" ? "EduLearn - Học viên" : "EduLearn - Giảng viên";
  const subtitle = isLogin
    ? activeRole === "student"
      ? "Đăng nhập học viên để tiếp tục"
      : "Đăng nhập giảng viên để tiếp tục"
    : activeRole === "student"
    ? "Tạo tài khoản học viên mới"
    : "Tạo tài khoản giảng viên mới";

  return (
    <AuthPageLayout>
      <div className="space-y-4">
        <AuthTabs activeRole={activeRole} onChange={setActiveRole} />
        <AuthHeader title={title} subtitle={subtitle} />
        <AuthForm
          isLogin={isLogin}
          formData={formData}
          errors={errors}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onToggle={handleToggle}
          demoEmailPlaceholder={
            activeRole === "student"
              ? DEMO_STUDENT.email
              : DEMO_INSTRUCTOR.email
          }
          demoEmailHint={
            activeRole === "student"
              ? `Demo: ${DEMO_STUDENT.email}`
              : `Demo: ${DEMO_INSTRUCTOR.email}`
          }
        />
      </div>
    </AuthPageLayout>
  );
}
