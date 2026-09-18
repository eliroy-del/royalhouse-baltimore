"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { ErrorBanner, PrivacyNote, SuccessPanel } from "@/components/forms/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Honeypot, Input, Select, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { churchConfig } from "@/config/church";
import { useFormPost } from "@/hooks/useFormPost";
import { serveSchema, type ServeInput } from "@/lib/validations";

export function ServeForm({ defaultTeam = "" }: { defaultTeam?: string }) {
  const { status, message, submit, reset } = useFormPost("/api/serve");
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ServeInput>({
    resolver: zodResolver(serveSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      team: defaultTeam,
      areas: "",
      experience: "",
      message: "",
      companyWebsite: "",
    },
  });

  if (status === "success") {
    return (
      <SuccessPanel
        title="Thank you for stepping up."
        message={message}
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              resetForm();
              reset();
            }}
          >
            Submit another interest
          </Button>
        }
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => submit(values))}
      className="relative flex flex-col gap-3"
    >
      <Honeypot register={register("companyWebsite")} />

      {status === "error" ? <ErrorBanner message={message} /> : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <Field id="serve-name" label="Your name" required error={errors.name?.message}>
          <Input
            id="serve-name"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "serve-name-error" : undefined}
            {...register("name")}
          />
        </Field>
        <Field id="serve-email" label="Email" required error={errors.email?.message}>
          <Input
            id="serve-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "serve-email-error" : undefined}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field id="serve-phone" label="Phone" hint="Optional." error={errors.phone?.message}>
          <Input
            id="serve-phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "serve-phone-error" : "serve-phone-hint"}
            {...register("phone")}
          />
        </Field>
        <Field id="serve-team" label="Team" required error={errors.team?.message}>
          <Select
            id="serve-team"
            aria-invalid={errors.team ? true : undefined}
            aria-describedby={errors.team ? "serve-team-error" : undefined}
            {...register("team")}
          >
            <option value="">Select a team</option>
            {churchConfig.serveTeams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        id="serve-areas"
        label="Areas of interest"
        hint="Optional. e.g. sound, ushers, kids."
        error={errors.areas?.message}
      >
        <Input id="serve-areas" {...register("areas")} />
      </Field>

      <Field
        id="serve-experience"
        label="Relevant experience"
        hint="Optional."
        error={errors.experience?.message}
      >
        <Textarea id="serve-experience" rows={2} className="min-h-16" {...register("experience")} />
      </Field>

      <Field id="serve-message" label="Anything else?" error={errors.message?.message}>
        <Textarea id="serve-message" rows={2} className="min-h-16" {...register("message")} />
      </Field>

      <div className="flex flex-col gap-2.5">
        <Checkbox
          id="serve-consent"
          label="I'm happy for Royalhouse Baltimore to contact me about serving"
          aria-invalid={errors.consent ? true : undefined}
          {...register("consent")}
        />
        {errors.consent ? (
          <p role="alert" className="text-xs font-medium text-red-700">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2.5">
        <Button type="submit" size="sm" disabled={status === "submitting"} className="self-start">
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Join a Team
              <Icon
                name="arrow-right"
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </>
          )}
        </Button>
        <PrivacyNote>
          Used only to follow up about serving. Never sold or shared.
        </PrivacyNote>
      </div>
    </form>
  );
}
