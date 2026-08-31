import Image from "next/image";
import { SocialGlyph } from "@/components/brand/SocialGlyphs";
import { Icon } from "@/components/ui/Icon";
import { navyBlurDataURL } from "@/config/images";
import { cn, initialsOf, isSupplied } from "@/lib/utils";
import type { Leader } from "@/types";

/** A real, supplied leader. */
export function LeaderCard({ leader, className }: { leader: Leader; className?: string }) {
  const socials = Object.entries(leader.socialLinks).filter(([, url]) => isSupplied(url));

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-media border border-navy-900/[0.08] bg-white",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-900">
        {isSupplied(leader.photo) ? (
          <Image
            src={leader.photo}
            alt={`Portrait of ${leader.name}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={navyBlurDataURL}
            className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          />
        ) : (
          <span className="flex size-full items-center justify-center font-display text-5xl text-gold-300">
            {initialsOf(leader.name)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-navy-900">{leader.name}</h3>
        <p className="mt-1 eyebrow text-gold-800">{leader.role}</p>
        <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-navy-900/65">
          {leader.bio}
        </p>

        {leader.responsibility ? (
          <p className="mt-5 border-t border-navy-900/[0.07] pt-4 text-[0.8125rem] leading-relaxed text-navy-900/65">
            {leader.responsibility}
          </p>
        ) : null}

        {isSupplied(leader.email) || socials.length > 0 ? (
          <div className="mt-5 flex items-center gap-3">
            {isSupplied(leader.email) ? (
              <a
                href={`mailto:${leader.email}`}
                aria-label={`Email ${leader.name}`}
                className="flex size-9 items-center justify-center rounded-full border border-navy-900/12 text-navy-900/65 transition-colors hover:border-gold-500/50 hover:bg-gold-100/60 hover:text-navy-900"
              >
                <Icon name="megaphone" className="size-4" />
              </a>
            ) : null}
            {socials.map(([platform, url]) => (
              <a
                key={platform}
                href={url as string}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${leader.name} on ${platform}`}
                className="flex size-9 items-center justify-center rounded-full border border-navy-900/12 text-navy-900/65 transition-colors hover:border-gold-500/50 hover:bg-gold-100/60 hover:text-navy-900"
              >
                <SocialGlyph platform={platform} className="size-4" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

/**
 * Role slot shown when the church has not yet supplied the person. We publish
 * the responsibility honestly rather than inventing a name or a face.
 */
export function LeaderSlotCard({
  role,
  responsibility,
  className,
}: {
  role: string;
  responsibility: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-media border border-dashed border-navy-900/15 bg-white/70",
        className,
      )}
    >
      <div className="relative flex aspect-[4/5] items-center justify-center bg-navy-900">
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,162,39,0.22),transparent_60%)]"
        />
        <span className="relative flex size-20 items-center justify-center rounded-full border border-gold-500/40 text-gold-300">
          <Icon name="users" className="size-8" strokeWidth={1.4} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-navy-900">{role}</h3>
        <p className="mt-1 eyebrow text-navy-900/65">Introduction coming soon</p>
        <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-navy-900/65">
          {responsibility}
        </p>
        <p className="mt-5 border-t border-navy-900/[0.07] pt-4 text-[0.8125rem] leading-relaxed text-navy-900/65">
          We would rather introduce this person properly than post a placeholder biography. Their
          profile appears here shortly.
        </p>
      </div>
    </article>
  );
}
