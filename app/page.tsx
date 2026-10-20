import Link from "next/link";
import { Photo } from "@/components/Photo";
import { LeadershipSection } from "@/components/Leadership";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const pillars = [
	{
		name: "Socio",
		text: "Basic education, health care and clean water for communities, mainly for children and women, and an end to harmful traditional practices.",
	},
	{
		name: "Economic",
		text: "Income schemes for women and other vulnerable people, backed by tree-friendly farming, beekeeping, eco-tourism and better ways to sell what they produce.",
	},
	{
		name: "Environmental",
		text: "Reforestation, land restoration, wildlife protection and practical adaptation to a changing climate.",
	},
	{
		name: "Peace",
		text: "Neighbours, schools and businesses working the same ground together, so shared land and water are looked after, not fought over.",
	},
];

export default function Home() {
	return (
		<>
			{/* Hero: the arch is taken from the logo's green arc */}
			<section className="overflow-hidden bg-forest text-white">
				<div className="wrap grid items-end gap-10 pt-14 lg:grid-cols-12 lg:gap-6 lg:pt-20">
					<div className="pb-4 lg:col-span-7 lg:pb-20">
						<h1 className="!text-white">
							Restoring Liberia's land with the communities that depend on it.
						</h1>
						<p className="mt-6 max-w-prose text-lg text-white/90">
							Greenpeace Environmental Initiative-Liberia is a civil society,
							community-based socio-economic and environmental membership
							organization focused on greening, climate action, environmental
							conservation and peace-building across Liberia.
						</p>
						<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
							<Link href="/get-involved" className="btn-sun">
								Volunteer with us
							</Link>
							<Link
								href="/our-work"
								className="font-semibold text-white decoration-sun"
							>
								See what we do
							</Link>
						</div>
						<p className="mt-10 max-w-md border-l-2 border-sun pl-4 text-sm text-white/80">
							Founded early in {site.founded}. Headquartered in Monrovia,
							Liberia. Working to reverse global warming and protect flora, fauna
							and aquatic life.
						</p>
					</div>

					<div className="relative mx-auto w-full max-w-[400px] lg:col-span-5 lg:max-w-none lg:pl-10">
						<div className="relative">
							<div
								aria-hidden="true"
								className="absolute inset-0 -translate-y-3 translate-x-3 rounded-t-full border-2 border-sun"
							/>
							<div className="arch-rise relative aspect-[4/5] overflow-hidden rounded-t-full bg-leaf">
								<Photo
									img={images.hero}
									priority
									sizes="(min-width: 1024px) 420px, 90vw"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Who we are */}
			<section className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
				<div className="md:col-span-5">
					<h2>A community-run initiative, based in Monrovia.</h2>
				</div>
				<div className="space-y-5 md:col-span-7">
					<p>
						Greenpeace Environmental Initiative-Liberia works on greening,
						reforestation, climate action and peace-focused environmental
						stewardship. Our work is grounded in the UN Sustainable Development
						Goals, especially SDG 13 (Climate Action), SDG 15 (Life on Land) and
						SDG 16 (Peace, Justice and Strong Institutions).
					</p>
					<p>
						We work with volunteers, schools, youth groups, community leaders,
						business partners and public institutions to restore land, protect
						forests and improve livelihoods while advancing sustainable
						development.
					</p>
					<blockquote className="border-l-4 border-leaf pl-5 font-display text-xl font-medium leading-snug text-forest">
						{site.philosophy}
					</blockquote>
				</div>
			</section>

			{/* Pillars: a ruled list, not cards */}
			<section>
				<div className="wrap py-16 md:py-24">
					<h2 className="max-w-xl">Every project answers to four pillars.</h2>
					<dl className="mt-10 border-t-2 border-forest">
						{pillars.map((p) => (
							<div
								key={p.name}
								className="grid gap-2 border-b border-forest/25 py-6 md:grid-cols-12 md:gap-8"
							>
								<dt className="font-display text-2xl font-bold text-forest md:col-span-4">
									{p.name}
								</dt>
								<dd className="max-w-prose md:col-span-8">{p.text}</dd>
							</div>
						))}
					</dl>
					<p className="mt-8">
						<Link
							href="/our-work"
							className="font-semibold text-forest"
						>
							Read about our programmes
						</Link>
					</p>
				</div>
			</section>

			{/* Seedling centre */}
			<section className="wrap grid items-center gap-10 py-16 md:grid-cols-12 md:py-24">
				<div className="aspect-[4/3] overflow-hidden md:col-span-6">
					<Photo img={images.seedlings} />
				</div>
				<div className="md:col-span-6 md:pl-6">
					<h2>The 10-Million Tree Seedlings Propagation Center</h2>
					<p className="mt-5 max-w-prose">
						Planting only works if the young trees are good. Our propagation
						centre supplies quality seedlings for our own planting sites and for
						landscaping and restoration work by schools, businesses and public
						bodies.
					</p>
					<p className="mt-6">
						<Link
							href="/get-involved#contact"
							className="font-semibold text-forest"
						>
							Ask about seedlings
						</Link>
					</p>
				</div>
			</section>

			<LeadershipSection />

			{/* Closing call */}
			<section className="border-t-4 border-sun bg-forest text-white">
				<div className="wrap grid items-center gap-8 py-14 md:grid-cols-12">
					<div className="md:col-span-7">
						<h2 className="!text-white">
							Tell us who you are and we will find where you can plant.
						</h2>
						<p className="mt-4 max-w-prose text-white/85">
							Individuals, classes, youth groups and companies all take part.
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-4 md:col-span-5 md:justify-end">
						<Link href="/get-involved" className="btn-sun">
							Get involved
						</Link>
						<a
							href={site.phones[0].href}
							className="font-semibold text-white decoration-sun"
						>
							Call {site.phones[0].display}
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
