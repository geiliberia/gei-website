import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Photo } from "@/components/Photo";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Volunteer, bring your school or youth group, partner as a business, or commission tree planting and environmental assessments from Greenpeace Environmental Initiative in Monrovia, Liberia.",
  alternates: { canonical: "/get-involved" },
};

const ways = [
  ["Donation", "Support our programmes with a financial gift that helps us buy seedlings, tools, transport and community materials for planting, restoration and clean-up work."],
  ["Volunteer", "Join a planting or clean-up day. You do not need experience, only the willingness to work outdoors."],
  ["Bring your school or youth group", "Classes and youth groups are a core part of our planting work. We help you plan a day that fits your group."],
  ["Partner as a business", "Support planting, landscaping, water-catchment protection or clean-up work through a public-private partnership."],
  ["Commission work", "Order an Environmental Impact Assessment, a tree-growing project, landscaping or seedlings from our propagation centre."],
] as const;

const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.line}, ${site.address.city}, ${site.address.country}`)}`;

export default function GetInvolved() {
  return (
    <>
      <section className="border-b border-forest/15 bg-mist">
        <div className="wrap grid items-end gap-8 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <h1>Get involved</h1>
            <p className="mt-5 max-w-prose text-lg">
              There is a place for individuals, schools, companies and public bodies. Pick the one closest to you, then send us a message or call.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-12 py-14 md:grid-cols-12 md:py-20">
        <ul className="divide-y divide-forest/25 border-y-2 border-forest md:col-span-7">
          {ways.map(([t, d]) => (
            <li key={t} className="py-6">
              <h2 className="!text-2xl">{t}</h2>
              <p className="mt-2 max-w-prose">{d}</p>
            </li>
          ))}
        </ul>
        <div className="md:col-span-5">
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-lg bg-mist shadow-sm ring-1 ring-forest/10">
              <div className="aspect-[4/3] overflow-hidden">
                <Photo img={images.community} sizes="(min-width: 768px) 440px, 100vw" className="h-full w-full" />
              </div>
              <p className="px-3 py-2 text-sm text-ink/70">Youth volunteers on a planting day.</p>
            </div>
            <div className="overflow-hidden rounded-lg bg-mist shadow-sm ring-1 ring-forest/10">
              <div className="aspect-[4/3] overflow-hidden">
                <Photo img={images.hero} sizes="(min-width: 768px) 440px, 100vw" className="h-full w-full" />
              </div>
              <p className="px-3 py-2 text-sm text-ink/70">Hands-on care for the next generation of trees.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-4 bg-mist">
        <div className="wrap grid gap-12 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <h2>Contact us</h2>
            <address className="mt-6 not-italic">
              <p className="font-semibold text-forest">Contact person</p>
              <p>{site.contactPerson}</p>

              <p className="mt-5 font-semibold text-forest">Phone</p>
              <ul>
                {site.phones.map((p) => (
                  <li key={p.href}><a href={p.href}>{p.display}</a></li>
                ))}
              </ul>

              <p className="mt-5 font-semibold text-forest">Visit</p>
              <p>{site.address.line}<br />{site.address.city}, {site.address.country}</p>
              <p className="mt-1"><a href={mapUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
            </address>
          </div>
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
