import { CTAButton } from "@/components/ui/cta-button";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Cont" : "Account",
    locale === "ro"
      ? "Pagina de cont pentru actualizarea profilului, a datelor companiei si a preferintelor workspace-ului."
      : "Account page for updating the profile, company data, and workspace preferences.",
    "/account",
    locale,
  );
}

export default async function AccountPage() {
  const locale = await getServerLocale();
  const profileLabels = locale === "ro"
    ? {
        profileTitle: "Detalii profil",
        profileDescription: "Actualizeaza datele de baza folosite pentru contact, demo si comunicarea din workspace.",
        fullName: "Nume complet",
        email: "Email",
        phone: "Telefon",
        role: "Rol",
        exampleFullName: "Andrei Popescu",
        exampleEmail: "andrei@syntraflow.local",
        examplePhone: "+40 721 000 000",
        exampleRole: "Owner / Product Lead",
        companyTitle: "Detalii companie",
        companyDescription: "Pastreaza intr-un singur loc informatiile despre companie si directia operationala.",
        companyName: "Companie",
        industry: "Industrie",
        website: "Website",
        location: "Locatie",
        exampleCompanyName: "SyntraFlow",
        exampleIndustry: "AI automation / SaaS",
        exampleWebsite: "https://syntraflow.local",
        exampleLocation: "Bucuresti, Romania",
        preferencesTitle: "Preferinte cont",
        preferencesDescription: "Configureaza ce tip de notificari si ce stil de experienta vrei in workspace.",
        notifEmail: "Notificari pe email",
        notifDemo: "Reminder pentru demo si follow-up",
        notifProduct: "Noutati despre produs si module",
        workspaceMode: "Mod workspace",
        workspaceTimezone: "Fus orar",
        selectWorkspaceMode: "Alege modul workspace",
        selectTimezone: "Alege fusul orar",
        save: "Salveaza modificarile",
        secondary: "Vezi produsul",
      }
    : {
        profileTitle: "Profile details",
        profileDescription: "Update the core information used for contact, demos, and workspace communication.",
        fullName: "Full name",
        email: "Email",
        phone: "Phone",
        role: "Role",
        exampleFullName: "Andrei Popescu",
        exampleEmail: "andrei@syntraflow.local",
        examplePhone: "+40 721 000 000",
        exampleRole: "Owner / Product Lead",
        companyTitle: "Company details",
        companyDescription: "Keep company information and operational direction in one place.",
        companyName: "Company",
        industry: "Industry",
        website: "Website",
        location: "Location",
        exampleCompanyName: "SyntraFlow",
        exampleIndustry: "AI automation / SaaS",
        exampleWebsite: "https://syntraflow.local",
        exampleLocation: "Bucharest, Romania",
        preferencesTitle: "Account preferences",
        preferencesDescription: "Set the notification style and workspace experience you want to use.",
        notifEmail: "Email notifications",
        notifDemo: "Demo and follow-up reminders",
        notifProduct: "Product and module updates",
        workspaceMode: "Workspace mode",
        workspaceTimezone: "Timezone",
        selectWorkspaceMode: "Choose workspace mode",
        selectTimezone: "Choose timezone",
        save: "Save changes",
        secondary: "View product",
      };

  return (
    <main className="pb-10">
      <PageIntro
        locale={locale}
        eyebrow={locale === "ro" ? "Detalii cont" : "Account details"}
        currentLabel={locale === "ro" ? "Cont" : "Account"}
        title={locale === "ro"
          ? "Personalizeaza datele contului, companiei si preferintele workspace-ului"
          : "Customize your account, company details, and workspace preferences"}
        description={locale === "ro"
          ? "Pagina de cont este gandita ca un loc clar pentru profil, date de business si setari care pot fi actualizate rapid."
          : "The account page is designed as a clear place for profile, business details, and settings that can be updated quickly."}
        highlights={locale === "ro"
          ? ["Profil", "Companie", "Notificari", "Workspace"]
          : ["Profile", "Company", "Notifications", "Workspace"]}
        compact
      />

      <section className="py-14">
        <div className="section-shell grid gap-6 xl:grid-cols-[1fr_1fr]">
          <article className="panel-surface rounded-[2rem] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {profileLabels.profileTitle}
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#0b1f35] md:text-[2.2rem]">
              {profileLabels.profileTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">{profileLabels.profileDescription}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="contact-field-shell rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{profileLabels.fullName}</span>
                <input
                  type="text"
                  placeholder={profileLabels.exampleFullName}
                  className="mt-2 w-full border-0 bg-transparent text-sm font-medium text-[#0b1f35] outline-none placeholder:font-normal placeholder:text-[#8aa0b4]"
                />
              </label>

              <label className="contact-field-shell rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{profileLabels.email}</span>
                <input
                  type="email"
                  placeholder={profileLabels.exampleEmail}
                  className="mt-2 w-full border-0 bg-transparent text-sm font-medium text-[#0b1f35] outline-none placeholder:font-normal placeholder:text-[#8aa0b4]"
                />
              </label>

              <label className="contact-field-shell rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{profileLabels.phone}</span>
                <input
                  type="text"
                  placeholder={profileLabels.examplePhone}
                  className="mt-2 w-full border-0 bg-transparent text-sm font-medium text-[#0b1f35] outline-none placeholder:font-normal placeholder:text-[#8aa0b4]"
                />
              </label>

              <label className="contact-field-shell rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{profileLabels.role}</span>
                <input
                  type="text"
                  placeholder={profileLabels.exampleRole}
                  className="mt-2 w-full border-0 bg-transparent text-sm font-medium text-[#0b1f35] outline-none placeholder:font-normal placeholder:text-[#8aa0b4]"
                />
              </label>
            </div>
          </article>

          <article className="panel-surface rounded-[2rem] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {profileLabels.companyTitle}
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#0b1f35] md:text-[2.2rem]">
              {profileLabels.companyTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">{profileLabels.companyDescription}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="contact-field-shell rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{profileLabels.companyName}</span>
                <input
                  type="text"
                  placeholder={profileLabels.exampleCompanyName}
                  className="mt-2 w-full border-0 bg-transparent text-sm font-medium text-[#0b1f35] outline-none placeholder:font-normal placeholder:text-[#8aa0b4]"
                />
              </label>

              <label className="contact-field-shell rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{profileLabels.industry}</span>
                <input
                  type="text"
                  placeholder={profileLabels.exampleIndustry}
                  className="mt-2 w-full border-0 bg-transparent text-sm font-medium text-[#0b1f35] outline-none placeholder:font-normal placeholder:text-[#8aa0b4]"
                />
              </label>

              <label className="contact-field-shell rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{profileLabels.website}</span>
                <input
                  type="text"
                  placeholder={profileLabels.exampleWebsite}
                  className="mt-2 w-full border-0 bg-transparent text-sm font-medium text-[#0b1f35] outline-none placeholder:font-normal placeholder:text-[#8aa0b4]"
                />
              </label>

              <label className="contact-field-shell rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{profileLabels.location}</span>
                <input
                  type="text"
                  placeholder={profileLabels.exampleLocation}
                  className="mt-2 w-full border-0 bg-transparent text-sm font-medium text-[#0b1f35] outline-none placeholder:font-normal placeholder:text-[#8aa0b4]"
                />
              </label>
            </div>
          </article>
        </div>
      </section>

      <section className="pb-12">
        <div className="section-shell">
          <article className="panel-surface accent-border rounded-[2rem] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {profileLabels.preferencesTitle}
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#0b1f35] md:text-[2.2rem]">
              {profileLabels.preferencesTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">{profileLabels.preferencesDescription}</p>

            <div className="mt-6 grid gap-4 lg:grid-cols-[0.7fr_0.3fr]">
              <div className="grid gap-4">
                <label className="contact-field-shell flex items-center justify-between rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-4">
                  <span className="text-sm font-medium text-[#0b1f35]">{profileLabels.notifEmail}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#0f79ff]" />
                </label>

                <label className="contact-field-shell flex items-center justify-between rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-4">
                  <span className="text-sm font-medium text-[#0b1f35]">{profileLabels.notifDemo}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#0f79ff]" />
                </label>

                <label className="contact-field-shell flex items-center justify-between rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-4">
                  <span className="text-sm font-medium text-[#0b1f35]">{profileLabels.notifProduct}</span>
                  <input type="checkbox" className="h-4 w-4 accent-[#0f79ff]" />
                </label>
              </div>

              <div className="grid gap-4">
                <label className="contact-field-shell rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{profileLabels.workspaceMode}</span>
                  <select defaultValue="" className="mt-2 w-full border-0 bg-transparent text-sm font-medium text-[#0b1f35] outline-none">
                    <option value="" disabled>{profileLabels.selectWorkspaceMode}</option>
                    <option value="professional">{locale === "ro" ? "Professional" : "Professional"}</option>
                    <option value="compact">{locale === "ro" ? "Compact" : "Compact"}</option>
                    <option value="presentation">{locale === "ro" ? "Presentation" : "Presentation"}</option>
                  </select>
                </label>

                <label className="contact-field-shell rounded-[1.35rem] border border-[#d7e6f5] bg-white/90 px-4 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{profileLabels.workspaceTimezone}</span>
                  <select defaultValue="" className="mt-2 w-full border-0 bg-transparent text-sm font-medium text-[#0b1f35] outline-none">
                    <option value="" disabled>{profileLabels.selectTimezone}</option>
                    <option value="Europe/Bucharest">Europe/Bucharest</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href="/account">{profileLabels.save}</CTAButton>
              <CTAButton href="/product" variant="secondary">{profileLabels.secondary}</CTAButton>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
