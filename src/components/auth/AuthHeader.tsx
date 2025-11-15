import { BookOpen } from "lucide-react";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg mb-4">
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
        {subtitle}
      </p>
    </div>
  );
}
