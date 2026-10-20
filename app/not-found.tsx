import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-24">
      <h1>That page doesn't exist.</h1>
      <p className="mt-4 max-w-prose">The link may be old or mistyped. Try one of these instead.</p>
      <p className="mt-6 flex flex-wrap gap-4">
        <Link href="/" className="btn-forest">Go to the home page</Link>
        <Link href="/our-work" className="btn border-2 border-forest text-forest no-underline">See our work</Link>
      </p>
    </div>
  );
}
