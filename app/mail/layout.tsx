import { cookies } from "next/headers";
import { LogoutButton } from "@/components/mail/logout-button";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/mail/session";

export default async function MailLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const authenticated = token ? await verifySessionToken(token) : false;

  return (
    <div className="min-h-screen bg-void text-chalk">
      {authenticated && (
        <header className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <a href="/mail" className="text-sm font-semibold tracking-wide text-chalk">
            NullPointer Mail
          </a>
          <LogoutButton />
        </header>
      )}
      <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
    </div>
  );
}
