"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useFormPost } from "@/hooks/useFormPost";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const { status, message, submit } = useFormPost("/api/newsletter");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", consent: true as const, companyWebsite: "" },
  });

  if (status === "success") {
    return (
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-center gap-2.5 rounded-xl border border-gold-500/30 bg-white/[0.06] px-4 py-3.5 text-[0.9375rem] text-white",
          className,
        )}
      >
        <Check aria-hidden="true" className="size-4 text-gold-300" />
        {message}
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => submit(values))}
      className={cn("relative", className)}
    >
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <input tabIndex={-1} autoComplete="off" {...register("companyWebsite")} />
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "newsletter-email-error" : undefined}
            className={cn(
              "h-12 w-full rounded-full border bg-white/[0.06] px-5 text-[0.9375rem] text-white",
              "placeholder:text-white/60 transition-colors",
              "focus:border-gold-400 focus:outline-none focus:ring-4 focus:ring-gold-500/20",
              errors.email ? "border-red-400/70" : "border-white/20 hover:border-white/35",
            )}
            {...register("email")}
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold-500 px-7 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-300 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Subscribing
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>

      {errors.email ? (
        <p id="newsletter-email-error" role="alert" className="mt-2 text-xs text-red-300">
          {errors.email.message}
        </p>
      ) : null}
      {status === "error" && message ? (
        <p role="alert" className="mt-2 text-xs text-red-300">
          {message}
        </p>
      ) : null}

      <p className="mt-3 text-xs leading-relaxed text-white/60">
        One short email with what matters. Unsubscribe any time — we never sell or share your
        details.
      </p>
    </form>
  );
}
