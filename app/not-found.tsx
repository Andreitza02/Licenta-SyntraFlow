import { CTAButton } from "@/components/ui/cta-button";
import { getServerLocale } from "@/lib/i18n-server";

export default async function NotFound() {
  const locale = await getServerLocale();

  return (
    <main className="section-shell flex min-h-screen items-center justify-center py-32">
      <section className="panel-surface accent-border max-w-3xl rounded-[2.2rem] p-8 text-center md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">Error 404</p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#0b1f35] md:text-6xl">
          {locale === "ro" ? "Hai inapoi la experienta SyntraFlow." : "Return to the SyntraFlow experience."}
        </h1>
        <p className="mt-5 text-base leading-8 text-muted md:text-lg">
          {locale === "ro"
            ? "Ruta introdusa nu este disponibila. Revino la experienta SyntraFlow si continua catre solutia potrivita."
            : "The route you entered is not available. Return to the SyntraFlow experience and continue toward the right solution."}
        </p>
        <div className="mt-8 flex justify-center">
          <CTAButton href="/">{locale === "ro" ? "Inapoi la acasa" : "Back to home"}</CTAButton>
        </div>
      </section>
    </main>
  );
}
