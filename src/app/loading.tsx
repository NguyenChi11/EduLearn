// app/loading.tsx
"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import Spinner from "@/components/ui/Spinner";
import Typography from "@/components/ui/Typography";

export default function Loading() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-6 py-12">
        {/* Spinner */}
        <Spinner size="lg" />

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <Typography variant="h2">Loading</Typography>
          <Typography variant="p">
            Please wait while we prepare your content...
          </Typography>
        </div>
      </div>
    </AuthLayout>
  );
}
