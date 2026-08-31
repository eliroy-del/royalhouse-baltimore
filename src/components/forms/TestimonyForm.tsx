"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { ErrorBanner, PrivacyNote, SuccessPanel } from "@/components/forms/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Honeypot, Input, Select, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { useFormPost } from "@/hooks/useFormPost";
import { testimonySchema, type TestimonyInput } from "@/lib/validations";

const categories = ["Salvation", "Healing", "Provision", "Family", "Freedom", "Community"] as const;

export function TestimonyForm() {
  const { status, message, submit, reset } = useFormPost("/api/testimony");
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<TestimonyInput>({
    resolver: zodResolver(testimonySchema),
    defaultValues: {
      name: "",
      email: "",
      category: "Community",
      testimony: "",
      permissionToPublish: false,
      anonymous: false,
      companyWebsite: "",
    },
  });

  if (status === "success") {
    return (
      <SuccessPanel
        title="Thank you for sharing."
        message={message}
        action={
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              reset();
            }}
          >
            Share another story
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

      {status === "error" ? <ErrorBanner message={message} /> : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="testimony-name" label="Your name" required error={errors.name?.message}>
          <Input
            id="testimony-name"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "testimony-name-error" : undefined}
            {...register("name")}
          />
        </Field>
        <Field id="testimony-email" label="Email" required error={errors.email?.message}>
          <Input
            id="testimony-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "testimony-email-error" : undefined}
            {...register("email")}
          />
        </Field>
      </div>

      <Field id="testimony-category" label="What did God do?" required>
        <Select id="testimony-category" {...register("category")}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        id="testimony"
        label="Your story"
        required
        hint="Where you were, what happened, and where you are now. Plain words are perfect."
        error={errors.testimony?.message}
      >
        <Textarea
          id="testimony"
          rows={8}
          aria-invalid={errors.testimony ? true : undefined}
          aria-describedby={errors.testimony ? "testimony-error" : "testimony-hint"}
          {...register("testimony")}
        />
      </Field>

      <div className="flex flex-col gap-4 rounded-xl border border-navy-900/[0.08] bg-mist p-5">
        <Checkbox
          id="permissionToPublish"
          label="Royalhouse Baltimore may share this story publicly"
          description="Leave this unchecked and we will keep it entirely private. Either way, a person reads it first, nothing is ever published automatically."
          {...register("permissionToPublish")}
        />
        <Checkbox
          id="testimony-anonymous"
          label="If it is shared, please keep me anonymous"
          {...register("anonymous")}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="self-start">
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Share My Testimony
              <Icon
                name="arrow-right"
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </>
          )}
        </Button>
        <PrivacyNote>
          Every submission goes to a moderation queue. We will always contact you before your story
          appears anywhere, and we will edit only for length and clarity.
        </PrivacyNote>
      </div>
    </form>
  );
}
