import { AuthForm } from "@/features/auth/form";
import { AuthShell } from "@/features/auth/shell";

export function LoginPage() {
  return (
    <AuthShell>
      <AuthForm key="login" mode="login" />
    </AuthShell>
  );
}
