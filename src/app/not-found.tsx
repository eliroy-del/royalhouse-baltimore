import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { images, navyBlurDataURL } from "@/config/images";

const suggestions = [
  { label: "Plan a visit", href: "/plan-a-visit", icon: "map-pin" as const },
  { label: "Latest messages", href: "/sermons", icon: "mic" as const },
  { label: "What's happening", href: "/events", icon: "calendar" as const },
  { label: "Request prayer", href: "/prayer", icon: "hands-praying" as const },
];

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[55svh] flex-col justify-center overflow-hidden bg-navy-950 py-14 text-white">
      <Image
        src={images.churchExteriorDusk.src}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={navyBlurDataURL}
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-950/80" />

      <Container className="relative text-center">
        <p className="eyebrow text-gold-300">404</p>
        <h1 className="mx-auto mt-7 max-w-3xl font-display text-[clamp(2.25rem,5.6vw,4.25rem)] font-light leading-[1.04]">
          Looks like you took a wrong turn.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
          Don&rsquo;t worry, there is still a place for you here. That page has either moved or
          never existed, but everything else is exactly where you left it.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="gold" size="xl">
            <Link href="/">Back Home</Link>
          </Button>
          <Button asChild variant="outline-light" size="xl">
            <Link href="/plan-a-visit">Plan Your Visit</Link>
          </Button>
        </div>

        <div className="mx-auto mt-16 max-w-2xl border-t border-white/12 pt-10">
          <p className="eyebrow text-white/60">Or try one of these</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {suggestions.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-[0.875rem] text-white/80 transition-colors duration-300 hover:border-gold-400/60 hover:bg-white/[0.06] hover:text-white"
                >
                  <Icon name={item.icon} className="size-4 text-gold-300" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
