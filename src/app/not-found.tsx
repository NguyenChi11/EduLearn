// app/not-found.tsx
import Link from "next/link";
import { Home, BookOpen, AlertCircle } from "lucide-react";

import AuthLayout from "@/components/auth/AuthLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import Icon from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <AuthLayout>
      <Card className="p-8 text-center">
        {/* 404 Header */}
        <div className="mb-8">
          <Typography variant="h1" className="mb-2">
            404
          </Typography>
          <Typography variant="h2">Page Not Found</Typography>
        </div>

        {/* Description */}
        <Typography variant="p" className="mb-8">
          {`The page you are looking for doesn't exist or has been moved.`}
        </Typography>

        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <Icon
              icon={AlertCircle}
              size="xl"
              className="text-slate-400 dark:text-slate-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <Link href="/">
            <Button variant="primary">
              <Home className="w-4 h-4 mr-2" />
              Go Back Home
            </Button>
          </Link>

          <Link href="/courses">
            <Button variant="secondary">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Courses
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <Typography variant="small" className="mt-8">
          If you believe this is a mistake, please{" "}
          <Link
            href="/contact"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            contact support
          </Link>
        </Typography>
      </Card>
    </AuthLayout>
  );
}
