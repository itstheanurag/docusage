import { SignUpForm } from "@/components/auth/SingUp"
import { Navbar } from "@/components/navbar"

export default function SignUpPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SignUpForm />
    </div>
  )
}
