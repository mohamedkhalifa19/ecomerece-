import { Link } from "@/i18n/navigation";
import { UserMetadata } from "@/lib/types";
import { User2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface IProps {
  setMenuOpen: (val: boolean) => void;
  user: UserMetadata | null;
}
function AccountBtn({ setMenuOpen, user }: IProps) {
  const t = useTranslations("Header");
  return (
    <>
      {" "}
      <Link
        href="/account"
        onClick={() => setMenuOpen(false)}
        className="text-[15px] text-on-surface md:hidden inline-flex"
      >
        {user ? t("account") : t("signIn")}
      </Link>{" "}
      <Link
        href="/account"
        aria-label={t("account")}
        className="hidden text-[14px] text-on-surface-variant transition-colors hover:text-on-surface sm:block"
      >
        {user ? user.name.split(" ")[0] : <User2 width={20} height={20} />}
      </Link>
    </>
  );
}

export default AccountBtn;
