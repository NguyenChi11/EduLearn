interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

export default function AuthToggle({ isLogin, onToggle }: AuthToggleProps) {
  return (
    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
        <button
          type="button"
          onClick={onToggle}
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          {isLogin ? "Đăng ký" : "Đăng nhập"}
        </button>
      </p>
    </div>
  );
}
