import { User as UserIcon } from "lucide-react";

interface UserAvatarProps {
  src?: string;
  name?: string;
  email?: string;
  size?: "sm" | "md" | "lg";
  showBorder?: boolean;
  className?: string;
}

export function UserAvatar({
  src,
  name,
  email,
  size = "md",
  showBorder = true,
  className = ""
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-20 w-20"
  };

  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-lg",
    lg: "text-2xl"
  };

  return (
    <div className={`relative overflow-hidden rounded-full ${showBorder ? 'border-4 border-background shadow-sm' : ''} ${sizeClasses[size]} ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <span className={`font-semibold text-muted-foreground ${textSizeClasses[size]}`}>
            {(name || email || "").charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
