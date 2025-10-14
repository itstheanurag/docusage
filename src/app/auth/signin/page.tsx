import { SignInForm } from "@/components/auth/SignIn";
import { Navbar } from "@/components/navbar";
export default function SignInPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SignInForm />
    </div>
  );
}
