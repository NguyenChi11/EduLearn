type AuthRole = "student" | "instructor";

interface AuthTabsProps {
  activeRole: AuthRole;
  onChange: (role: AuthRole) => void;
}

export default function AuthTabs({ activeRole, onChange }: AuthTabsProps) {
  const isStudent = activeRole === "student";

  return (
    <div className="flex rounded-lg bg-slate-100 dark:bg-slate-900 p-1 mb-6">
      <button
        type="button"
        onClick={() => onChange("student")}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition
        ${
          isStudent
            ? "bg-white dark:bg-slate-800 text-blue-600 shadow"
            : "text-slate-600 dark:text-slate-300 hover:text-blue-600"
        }`}
      >
        Học viên
      </button>
      <button
        type="button"
        onClick={() => onChange("instructor")}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition
        ${
          !isStudent
            ? "bg-white dark:bg-slate-800 text-blue-600 shadow"
            : "text-slate-600 dark:text-slate-300 hover:text-blue-600"
        }`}
      >
        Giảng viên
      </button>
    </div>
  );
}
