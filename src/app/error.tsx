// app/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Home, RotateCw } from "lucide-react";

import AuthLayout from "@/components/auth/AuthLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <AuthLayout>
      <Card className="p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Title & Message */}
        <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">
          Something went wrong!
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-4">
          An error occurred while processing your request.
        </p>

        {error.message && (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6 wrap-break-word font-mono bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded">
            {error.message}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button onClick={reset} variant="primary">
            <RotateCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Link href="/" className="block">
            <Button variant="secondary">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </Card>
    </AuthLayout>
  );
}
