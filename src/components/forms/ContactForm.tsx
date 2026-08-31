"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { ErrorBanner, PrivacyNote, SuccessPanel } from "@/components/forms/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Honeypot, Input, Select, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { useFormPost } from "@/hooks/useFormPost";
import { contactReasons, contactSchema, type ContactInput } from "@/lib/validations";

export function ContactForm() {
  const { status, message, submit, reset } = useFormPost("/api/contact");
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      reason: "General Question",
      message: "",
      companyWebsite: "",
    },
  });

  if (status === "success") {
    return (
      <SuccessPanel
        title="Message received."
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
            Send another message
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
        <Field id="contact-name" label="Your name" required error={errors.name?.message}>
          <Input
            id="contact-name"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
        </Field>
        <Field id="contact-email" label="Email" required error={errors.email?.message}>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field id="contact-phone" label="Phone" hint="Optional." error={errors.phone?.message}>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "contact-phone-error" : "contact-phone-hint"}
            {...register("phone")}
          />
        </Field>
        <Field id="reason" label="What is this about?" required>
          <Select id="reason" {...register("reason")}>
            {contactReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field id="message" label="Your message" required error={errors.message?.message}>
        <Textarea
          id="message"
          rows={3}
          className="min-h-20"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
      </Field>

      <div className="rounded-lg border border-navy-900/[0.08] bg-mist p-3">
        <Checkbox
          id="contact-consent"
          label="I'm happy for Royalhouse Baltimore to reply to me"
          aria-invalid={errors.consent ? true : undefined}
          {...register("consent")}
        />
        {errors.consent ? (
          <p role="alert" className="mt-2 text-xs font-medium text-red-700">
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
              Send Message
              <Icon
                name="arrow-right"
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </>
          )}
        </Button>
        <PrivacyNote>
          We use your details only to answer you. Pastoral and prayer matters are handled
          confidentially by our pastoral team.
        </PrivacyNote>
      </div>
    </form>
  );
}
