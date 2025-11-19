interface UserContentProps {
  children: React.ReactNode;
}

export function UserContent({ children }: UserContentProps) {
  return (
    <section className="flex-1">
      <div className="rounded-lg border bg-card shadow-sm">
        {children}
      </div>
    </section>
  );
}
