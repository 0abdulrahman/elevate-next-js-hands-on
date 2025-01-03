import { useTranslations } from "next-intl";
import RegisterForm from "./_components/register-form";
import { Link } from "@/i18n/routing";

export default function Page() {
  // Translation
  const t = useTranslations();

  return (
    <section className="flex justify-center w-[474px] items-center px-8 flex-col gap-2.5">
      {/* Heading */}
      <h2 className="text-2xl  px-3 font-medium">{t("Register")}</h2>

      {/* Form */}
      <RegisterForm />

      <p className="text-zinc-500 mt-6 text-sm">
        {t.rich("register-login", {
          a: (v) => (
            <Link href="/auth/login" className="font-semibold text-emerald-500">
              {v}
            </Link>
          ),
        })}
      </p>
    </section>
  );
}
