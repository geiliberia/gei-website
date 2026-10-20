export const site = {
  name: "Greenpeace Environmental Initiative",
  short: "GEI",
  alias: "Civil Society Environmental Africa",
  country: "Liberia",
  tagline: "Let's go green with you.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  founded: 2025,
  contactPerson: "Michael Jamal Yates",
  address: { line: "Thinker Village, Robertsfield Highway", city: "Monrovia", country: "Liberia", countryCode: "LR" },
  phones: [
    { display: "+231 77 572 2323", href: "tel:+231775722323" },
    { display: "+231 88 625 4457", href: "tel:+231886254457" },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/our-work", label: "Our work" },
  { href: "/get-involved", label: "Get involved" },
] as const;
