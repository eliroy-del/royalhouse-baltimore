"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ErrorBanner, PrivacyNote, SuccessPanel } from "@/components/forms/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Honeypot, Input, Select, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { churchConfig } from "@/config/church";
import { useFormPost } from "@/hooks/useFormPost";
import { planVisitSchema, type PlanVisitInput } from "@/lib/validations";

export function PlanVisitForm() {
  const { status, message, submit, reset } = useFormPost("/api/visit");
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<PlanVisitInput>({
    resolver: zodResolver(planVisitSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      adults: 1,
      children: 0,
      preferredService: "",
      questions: "",
      wantsContact: true,
      companyWebsite: "",
    },
  });

  if (status === "success") {
    return (
      <SuccessPanel
        title="We're expecting you!"
        message={message}
        action={
          <>
            <Button asChild variant="primary" size="md">
              <Link href="/plan-a-visit#children">About kids ministry</Link>
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                resetForm();
                reset();
              }}
            >
              Plan another visit
            </Button>
          </>
        }
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => submit(values))}
      className="relative flex flex-col gap-3.5"
    >
      <Honeypot register={register("companyWebsite")} />

      {status === "error" ? <ErrorBanner message={message} /> : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <Field id="firstName" label="First name" required error={errors.firstName?.message}>
          <Input
            id="firstName"
            autoComplete="given-name"
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            {...register("firstName")}
          />
        </Field>
        <Field id="lastName" label="Last name" required error={errors.lastName?.message}>
          <Input
            id="lastName"
            autoComplete="family-name"
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            {...register("lastName")}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field id="email" label="Email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Field id="adults" label="Adults" required error={errors.adults?.message}>
          <Input
            id="adults"
            type="number"
            min={1}
            max={20}
            inputMode="numeric"
            aria-invalid={errors.adults ? true : undefined}
            {...register("adults")}
          />
        </Field>
        <Field id="children" label="Children" error={errors.children?.message}>
          <Input
            id="children"
            type="number"
            min={0}
            max={20}
            inputMode="numeric"
            aria-invalid={errors.children ? true : undefined}
            {...register("children")}
          />
        </Field>
        <Field id="preferredService" label="Service">
          <Select id="preferredService" {...register("preferredService")}>
            <option value="">No preference</option>
            {churchConfig.serviceTimes.map((service) => (
              <option key={`${service.day}-${service.time}`} value={`${service.day} ${service.time}`}>
                {service.day} · {service.time}
              </option>
            ))}
            {churchConfig.serviceTimes.length === 0 ? (
              <option value="Sunday morning">Sunday morning</option>
            ) : null}
          </Select>
        </Field>
      </div>

      <Field id="questions" label="Anything we should know?" error={errors.questions?.message}>
        <Textarea
          id="questions"
          rows={2}
          placeholder="Kids' ages, accessibility needs, questions…"
          {...register("questions")}
        />
      </Field>

      <div className="flex flex-col gap-2.5">
        <Checkbox
          id="wantsContact"
          label="Have someone contact me before I visit"
          {...register("wantsContact")}
        />
        <Checkbox
          id="consent"
          label="I'm happy for Royalhouse Baltimore to contact me about this visit"
          aria-invalid={errors.consent ? true : undefined}
          {...register("consent")}
        />
        {errors.consent ? (
          <p role="alert" className="text-xs font-medium text-red-700">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="md" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Plan My Visit
              <Icon
                name="arrow-right"
                className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </>
          )}
        </Button>
        <PrivacyNote>
          Used only to prepare for your visit. Never sold or shared.
        </PrivacyNote>
      </div>
    </form>
  );
}
