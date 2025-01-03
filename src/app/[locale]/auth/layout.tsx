import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Header from "./_components/header";

type AuthLayoutProps = {
  children: React.ReactNode;
} & Pick<BaseParams, "params">;

export default function AuthLayout({ params: { locale }, children }: AuthLayoutProps) {
  setRequestLocale(locale);

  // Translation
  const t = useTranslations();

  return (
    <main className="grid grid-cols-2 h-screen">
      {/* Auth UI */}
      <section className="bg-emerald-500 flex justify-center p-8 items-center text-white">
        <h1 className="font-bold text-6xl uppercase">
          {t.rich("auth-h1", {
            span: (v) => <span className="block font-extralight text-2xl">{v}</span>,
          })}
        </h1>
      </section>

      {/* Auth pages */}
      <div className="flex flex-col  px-8 items-center justify-center overflow-auto">
        {/* Header */}
        <Header />

        {children}
      </div>
    </main>
  );
}
