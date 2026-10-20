import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.jpg" alt="" width={64} height={49} className="h-12 w-auto rounded-sm bg-white p-1" />
            <p className="font-display text-xl font-bold leading-tight">{site.name}</p>
          </div>
          <p className="mt-4 max-w-sm text-white/80">
            Also known as {site.alias}. A community-based initiative in Monrovia, Liberia, working on reforestation, clean-up and climate action.
          </p>
          <p className="mt-5 font-display text-lg italic text-sun-soft">…{site.tagline}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="font-display text-lg font-semibold">Pages</p>
          <ul className="mt-3 space-y-2">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-white/85 hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-4">
          <p className="font-display text-lg font-semibold">Find us</p>
          <p className="mt-3 text-white/85">
            {site.address.line}<br />{site.address.city}, {site.address.country}
          </p>
          <ul className="mt-3 space-y-1">
            {site.phones.map((p) => (
              <li key={p.href}><a href={p.href} className="text-white/85 hover:text-white">{p.display}</a></li>
            ))}
          </ul>
        </address>
      </div>
      <div className="border-t border-white/15">
        <p className="wrap py-5 text-sm text-white/65">© {new Date().getFullYear()} {site.name}, Liberia. All rights reserved.</p>
      </div>
    </footer>
  );
}
