import { redirect } from "next/navigation";

export default function HomePage() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    redirect("/login");
  }

  return <div></div>;
}
