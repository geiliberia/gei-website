import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { images } from "@/lib/images";
import { fieldReports } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Tree growing and ecosystem restoration, environmental impact assessments, the Clean Up Liberia Initiative and community livelihood programmes run by Greenpeace Environmental Initiative.",
  alternates: { canonical: "/our-work" },
};

const index = [
  ["restoration", "Ecosystem restoration"],
  ["consultancy", "Environmental consultancy"],
  ["cleanup", "Clean Up Liberia"],
  ["communities", "Communities and livelihoods"],
  ["conservation", "Wildlife and disaster response"],
  ["gallery", "Work in the field"],
] as const;

const steps = [
  ["Assess the site", "We look at the land, soil and what the community wants from it."],
  ["Match the species", "Trees are chosen to suit the site, not the other way round."],
  ["Supply the seedlings", "Seedlings come from our own propagation centre."],
  ["Plant together", "Volunteers, schools and youth groups put the trees in the ground."],
] as const;

const galleryItems = [
  { title: "Planting day", summary: "Young saplings go into the ground with schools, youth groups and local leaders.", img: images.fieldPlanting },
  { title: "Shared stewardship", summary: "Communities plan, protect and care for restored land together.", img: images.fieldCommunity },
  { title: "Watershed care", summary: "Tree cover helps hold soil, protect water and reduce climate risk.", img: images.fieldWatershed },
  { title: "Livelihoods", summary: "Women and families build better income while restoring the environment.", img: images.fieldWomen },
  { title: "Wildlife corridors", summary: "Habitat protection and species care keep ecosystems alive.", img: images.fieldWildlife },
  { title: "Cleanup action", summary: "Neighbourhood clean-ups and safer public spaces build community pride.", img: images.fieldCleanupDay },
] as const;

export default function OurWork() {
  return (
    <>
      <section className="border-b border-forest/15 bg-mist">
        <div className="wrap grid gap-8 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <h1>Our work</h1>
            <p className="mt-5 max-w-prose text-lg">
              We design and run programmes that reduce environmental damage, climate risk and poverty, in partnership with the people and institutions who share the same land.
            </p>
          </div>
          <p className="self-end border-l-4 border-sun pl-5 font-display text-xl leading-snug text-forest md:col-span-5">
            Mission: life-changing development programmes and livelihood schemes, built with stakeholders, for sustainable development.
          </p>
        </div>
      </section>

      <div className="wrap grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ul className="sticky top-8 space-y-3 border-l-2 border-forest/25 pl-5">
            {index.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="font-medium text-forest no-underline hover:underline">{label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="space-y-20 lg:col-span-9">
          <section id="restoration" className="scroll-mt-8">
            <h2>Ecosystem restoration</h2>
            <p className="mt-4 max-w-prose">
              We offer a complete tree-growing service, along with professional landscaping and seedlings from the 10-Million Tree Seedlings Propagation Center. A planting project follows four steps.
            </p>
            <ol className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {steps.map(([title, text], i) => (
                <li key={title} className="border-t-2 border-leaf pt-3">
                  <p className="font-display text-lg font-semibold text-forest">{i + 1}. {title}</p>
                  <p className="mt-1">{text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 aspect-[16/9] overflow-hidden">
              <Photo img={images.restoration} sizes="(min-width: 1024px) 760px, 100vw" />
            </div>
          </section>

          <section id="gallery" className="scroll-mt-8" aria-labelledby="gallery-title">
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-forest/20 pb-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-forest/70">Field notes</p>
                <h2 id="gallery-title" className="mt-2">Work in the field</h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {galleryItems.map((item, index) => (
                <article key={item.title} className={index % 2 === 0 ? "sm:translate-y-4" : ""}>
                  <div className="group relative overflow-hidden bg-mist">
                    <div className="aspect-[4/5] overflow-hidden">
                      <Photo img={item.img} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw" className="transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-0 bg-forest/80 opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden="true" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition duration-300 group-hover:opacity-100">
                      <p className="font-display text-xl font-semibold">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/85">{item.summary}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="grid gap-12 md:grid-cols-2">
            <section id="consultancy" className="scroll-mt-8">
              <h2>Environmental consultancy</h2>
              <p className="mt-4">
                We carry out Environmental Impact Assessments and help public and private organisations plan how to adapt to climate change.
              </p>
              <p className="mt-4"><Link href="/get-involved#contact" className="font-semibold text-forest">Ask for an assessment</Link></p>
            </section>
            <section id="cleanup" className="scroll-mt-8">
              <h2>Clean Up Liberia Initiative</h2>
              <p className="mt-4">
                Through public-private partnerships we support physical infrastructure, land-use management and the protection of water catchments.
              </p>
              <div className="mt-5 aspect-[4/3] overflow-hidden">
                <Photo img={images.cleanup} sizes="(min-width: 1024px) 360px, 100vw" />
              </div>
            </section>
          </div>

          <section id="communities" className="scroll-mt-8">
            <h2>Communities and livelihoods</h2>
            <dl className="mt-6 border-t-2 border-forest">
              {[
                ["Farming that keeps trees", "Agro-forestry, backyard development, improved animal husbandry and beekeeping, plus help marketing what families produce."],
                ["Eco-friendly business", "Eco-tourism and other enterprises that earn income without damaging the environment."],
                ["Income for women and vulnerable people", "Feasible income-generation schemes that give women and other vulnerable community members economic independence."],
                ["Basic services", "Primary education, health care, water supply and work to end harmful traditional practices, mainly for children and women."],
              ].map(([t, d]) => (
                <div key={t} className="grid gap-1 border-b border-forest/25 py-5 md:grid-cols-12 md:gap-8">
                  <dt className="font-display text-xl font-semibold text-forest md:col-span-4">{t}</dt>
                  <dd className="md:col-span-8">{d}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="conservation" className="scroll-mt-8">
            <h2>Wildlife and disaster response</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <p>We speak up for wildlife conservation, pressing for policies that protect endangered species, preserve habitats and counter environmental threats.</p>
              <p>We take part in disaster early warning, relief and rehabilitation activities.</p>
            </div>
          </section>

          {fieldReports.length > 0 && (
            <section aria-labelledby="reports">
              <h2 id="reports">Recent planting days</h2>
              <ul className="mt-6 divide-y divide-forest/20 border-y border-forest/20">
                {fieldReports.map((r) => (
                  <li key={r.date + r.title} className="py-5">
                    <p className="text-sm text-ink/70"><time dateTime={r.date}>{new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>, {r.place}</p>
                    <h3 className="mt-1">{r.title}</h3>
                    <p className="mt-2 max-w-prose">{r.summary}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <section className="border-t-4 border-sun bg-forest text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-6 py-12">
          <h2 className="max-w-xl !text-white">Want to work with us on any of this?</h2>
          <Link href="/get-involved" className="btn-sun">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
