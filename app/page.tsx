import { redirect } from "next/navigation";
import { tokenStorage } from "@/lib/token";

export default function Page() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}