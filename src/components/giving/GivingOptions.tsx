import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { churchConfig, churchStatus } from "@/lib/church";
import { isSupplied } from "@/lib/utils";

/**
 * Giving is provider-agnostic by design. Until the church selects a platform
 * (Stripe, Tithe.ly, Pushpay, Planning Center…) we present honest alternatives
 * rather than a button that leads nowhere.
 */
export function GivingOptions() {
  const { giving } = churchConfig;

  const methods = [
    {
      id: "online",
      icon: "gift" as const,
      title: "Give online",
      description: churchStatus.hasGiving
        ? "Secure one-off or recurring gifts, card or bank transfer, from any device."
        : "Our secure online giving platform is being finalised. As soon as it is live, it will appear right here.",
      action: churchStatus.hasGiving ? (
        <Button asChild variant="gold" size="md">
          <a href={giving.onlineUrl} target="_blank" rel="noreferrer noopener">
            Give Online
            <Icon name="arrow-right" className="size-3.5" />
          </a>
        </Button>
      ) : (
        <Button asChild variant="outline" size="md">
          <Link href="/contact">Ask how to give today</Link>
        </Button>
      ),
      available: churchStatus.hasGiving,
    },
    {
      id: "in-person",
      icon: "church" as const,
      title: "Give in person",
      description:
        "An offering is received as part of our Sunday worship. If you are visiting for the first time, please let it pass you by — this is for people who call this church home.",
      action: (
        <Button asChild variant="link" size="none">
          <Link href="/plan-a-visit">Join us on Sunday</Link>
        </Button>
      ),
      available: true,
    },
    {
      id: "text",
      icon: "message-circle" as const,
      title: "Text to give",
      description: isSupplied(giving.textToGiveNumber)
        ? `Text your gift amount to ${giving.textToGiveNumber} and follow the prompts.`
        : "Text giving will be available once our giving platform is chosen.",
      action: null,
      available: isSupplied(giving.textToGiveNumber),
    },
    {
      id: "mail",
      icon: "home" as const,
      title: "By mail or bank transfer",
      description: isSupplied(giving.mailingInstructions)
        ? giving.mailingInstructions
        : "Prefer to give by check or a recurring bank transfer? Contact the church office and we will send you the details.",
      action: (
        <Button asChild variant="link" size="none">
          <Link href="/contact">Contact the office</Link>
        </Button>
      ),
      available: true,
    },
  ];

  return (
    <div className="grid gap-px overflow-hidden rounded-media border border-navy-900/[0.08] bg-navy-900/[0.07] sm:grid-cols-2">
      {methods.map((method) => (
        <div key={method.id} className="flex flex-col bg-white p-7 lg:p-8">
          <span className="flex size-11 items-center justify-center rounded-full bg-navy-900/[0.05] text-navy-800">
            <Icon name={method.icon} className="size-5" />
          </span>
          <h3 className="mt-5 flex items-center gap-2.5 text-[1.0625rem] font-semibold text-navy-900">
            {method.title}
            {!method.available ? (
              <span className="rounded-full bg-navy-900/[0.06] px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-navy-900/65">
                Coming soon
              </span>
            ) : null}
          </h3>
          <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-navy-900/65">
            {method.description}
          </p>
          {method.action ? <div className="mt-6">{method.action}</div> : null}
        </div>
      ))}
    </div>
  );
}
