import { AuthForm } from "@/features/auth/form";
import { AuthShell } from "@/features/auth/shell";

export function SignupPage() {
  return (
    <AuthShell>
      <AuthForm key="signup" mode="signup" />
    </AuthShell>
  );
}
