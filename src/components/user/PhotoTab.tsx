"use client";

import { useState, ChangeEvent, useRef } from "react";
import { User as Upload, X } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { UserAvatar } from "./UserAvatar";

interface PhotoTabProps {
  avatarPreview: string | null;
  onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAvatarUpdate?: (avatarUrl: string) => void;
  userAvatar?: string;
}

export default function PhotoTab({
  avatarPreview,
  onAvatarChange,
  onAvatarUpdate,
  userAvatar,
}: PhotoTabProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      return "Chỉ chấp nhận file PNG, JPG, JPEG";
    }

    if (file.size > maxSize) {
      return "Dung lượng file tối đa 5MB";
    }

    return null;
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // Call the original onAvatarChange for preview
      onAvatarChange(event);

      // Simulate upload to server
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, we'll use the object URL as the avatar URL
      // In production, this would be the URL returned from the server
      const avatarUrl = URL.createObjectURL(file);

      // Call the callback to update the user data
      onAvatarUpdate?.(avatarUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload thất bại. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setIsUploading(true);
    try {
      // Simulate API call to remove avatar
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onAvatarUpdate?.("");
      setError(null);

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Remove avatar failed:", error);
      setError("Xóa ảnh thất bại. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  const currentAvatar = avatarPreview || userAvatar;

  return (
    <div className="space-y-6">
      <div className="space-y-2 p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Ảnh đại diện</h2>
        <p className="text-sm text-muted-foreground">
          Cập nhật avatar của bạn. Nên dùng ảnh vuông, rõ mặt, kích thước tối
          thiểu 400x400.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center gap-4">
          <UserAvatar
            src={currentAvatar}
            name={userAvatar ? "User" : undefined}
            size="lg"
            className="h-24 w-24"
          />
          {currentAvatar && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleRemoveAvatar}
              disabled={isUploading}
              className="h-8"
            >
              {isUploading ? (
                <>
                  <Upload className="mr-2 h-3 w-3 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <X className="mr-2 h-3 w-3" />
                  Xóa ảnh
                </>
              )}
            </Button>
          )}
        </div>

        <div className="flex-1 space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="avatar" className="text-sm font-medium">
              Tải ảnh lên
            </Label>
            <Input
              ref={fileInputRef}
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <p className="text-sm text-muted-foreground">
              Hỗ trợ PNG, JPG, JPEG. Dung lượng tối đa 5MB.
            </p>
          </div>

          <div className="rounded-md border border-dashed border-input p-4">
            <p className="text-sm text-muted-foreground">
              Gợi ý: Một bức ảnh sáng, rõ nét, nền đơn giản sẽ giúp hồ sơ của
              bạn trông chuyên nghiệp hơn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
