"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { ErrorBanner, SuccessPanel } from "@/components/forms/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Honeypot, Input, Select, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { useFormPost } from "@/hooks/useFormPost";
import { prayerCategories, prayerSchema, type PrayerInput } from "@/lib/validations";

export function PrayerForm() {
  const { status, message, submit, reset } = useFormPost("/api/prayer");
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<PrayerInput>({
    resolver: zodResolver(prayerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "Personal",
      request: "",
      keepPrivate: true,
      anonymous: false,
      wantsFollowUp: false,
      companyWebsite: "",
    },
  });

  if (status === "success") {
    return (
      <SuccessPanel
        title="Your request has been received."
        message={message}
        action={
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              reset();
            }}
          >
            Send another request
          </Button>
        }
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => submit(values))}
      className="relative flex flex-col gap-6"
    >
      <Honeypot register={register("companyWebsite")} />

      <p className="flex items-start gap-3 rounded-xl border border-gold-500/25 bg-gold-100/40 px-4 py-3.5 text-[0.875rem] leading-relaxed text-navy-900/80">
        <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-700" />
        <span>
          Everything you send here is read only by our pastoral prayer team. It is never published,
          never shared with anyone else, and never posted publicly.
        </span>
      </p>

      {status === "error" ? <ErrorBanner message={message} /> : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="prayer-name"
          label="Your name"
          hint="Optional, leave blank to stay anonymous."
          error={errors.name?.message}
        >
          <Input
            id="prayer-name"
            autoComplete="name"
            aria-describedby="prayer-name-hint"
            {...register("name")}
          />
        </Field>
        <Field id="category" label="What is this about?" required>
          <Select id="category" {...register("category")}>
            {prayerCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="prayer-email"
          label="Email"
          hint="Only if you would like us to reply."
          error={errors.email?.message}
        >
          <Input
            id="prayer-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "prayer-email-error" : "prayer-email-hint"}
            {...register("email")}
          />
        </Field>
        <Field id="prayer-phone" label="Phone" hint="Optional." error={errors.phone?.message}>
          <Input
            id="prayer-phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "prayer-phone-error" : "prayer-phone-hint"}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field
        id="request"
        label="How can we pray?"
        required
        hint="As much or as little as you want to say."
        error={errors.request?.message}
      >
        <Textarea
          id="request"
          rows={6}
          aria-invalid={errors.request ? true : undefined}
          aria-describedby={errors.request ? "request-error" : "request-hint"}
          {...register("request")}
        />
      </Field>

      <div className="flex flex-col gap-4 rounded-xl border border-navy-900/[0.08] bg-mist p-5">
        <Checkbox
          id="keepPrivate"
          label="Keep this between me and the prayer team"
          description="Leave this checked and your request goes no further than our pastoral team."
          {...register("keepPrivate")}
        />
        <Checkbox
          id="anonymous"
          label="Submit anonymously"
          description="We will pray without recording your name."
          {...register("anonymous")}
        />
        <Checkbox
          id="wantsFollowUp"
          label="I would like someone to follow up with me"
          {...register("wantsFollowUp")}
        />
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send Prayer Request
            <Icon
              name="arrow-right"
              className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </>
        )}
      </Button>
    </form>
  );
}
