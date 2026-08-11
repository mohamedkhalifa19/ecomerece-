import Button from "@/components/Button";
import { logout } from "@/lib/server-actions";

export default function LogoutButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="secondary"
        size="sm"
        className="mt-6 w-full"
      >
        {children}
      </Button>
    </form>
  );
}
