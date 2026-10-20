export const site = {
  name: "Greenpeace Environmental Initiative-Liberia",
  short: "GEI-Liberia",
  alias: "Civil Society Community-Based, Socio-economic and Environmental Membership Organization",
  country: "Liberia",
  tagline: "Leaving a heritage for future generations of a cleaner, greener and food- and water-secure environment.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  founded: 2025,
  contactPerson: "Michael Y. Jamal",
  address: { line: "Thinker Village, Robertsfield Highway", city: "Monrovia", country: "Liberia", countryCode: "LR" },
  phones: [
    { display: "+231 77 572 2323", href: "tel:+231775722323" },
    { display: "+231 88 625 4457", href: "tel:+231886254457" },
    { display: "+231 077 718 4528", href: "tel:+2310777184528" },
  ],
  mission: "To reverse global warming and climate change under the UN Sustainable Development Goals, especially SDG 13, SDG 15 and SDG 16, while protecting flora, fauna and aquatic life for future generations.",
  philosophy: "Leaving a Heritage for Future Generations of a Cleaner, Greener (Food & Water) Secure Environment of FLORA, FAUNA & AQUATIC LIFE.",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/our-work", label: "Our work" },
  { href: "/get-involved", label: "Get involved" },
] as const;
