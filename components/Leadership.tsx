import { Photo } from "@/components/Photo";
import { images } from "@/lib/images";

const leaders = [
  {
    name: "Michael Y. Jamal",
    role: "Executive Director / Climate Change Advocate",
    bio: "Leads GEI-Liberia’s climate action, conservation advocacy and strategic partnerships across Liberia.",
    img: images.leadershipMichael,
  },
  {
    name: "Mr. Marleen B. Sneapo",
    role: "National Chairman",
    bio: "Provides national leadership in governance, policy engagement and environmental peace-building for the organization.",
    img: images.leadershipMarleen,
  },
  {
    name: "Mr. Karine J. D.",
    role: "Coordinator / Researcher",
    bio: "Supports field research, environmental analysis and programme delivery for restoration and conservation work.",
    img: images.leadershipKarine,
  },
] as const;

export function LeadershipSection() {
  return (
    <section className="bg-mist">
      <div className="wrap py-16 md:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-forest/70">Our team</p>
          <h2 className="mt-3">Leadership driving action for climate, land and peace.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {leaders.map((person) => (
            <article key={person.name} className="overflow-hidden rounded-lg border border-forest/15 bg-white shadow-sm">
              <div className="aspect-[4/5] overflow-hidden">
                <Photo img={person.img} sizes="(min-width: 1024px) 33vw, 100vw" className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="!text-xl">{person.name}</h3>
                <p className="mt-2 font-medium text-forest">{person.role}</p>
                <p className="mt-3 text-ink/80">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
