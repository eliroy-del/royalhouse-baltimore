"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const controlBase = [
  "w-full rounded-lg border bg-white px-3 text-[0.875rem] text-navy-900",
  "border-navy-900/15 placeholder:text-navy-900/35",
  "transition-[border-color,box-shadow] duration-200",
  "hover:border-navy-900/25",
  "focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/15",
  "disabled:cursor-not-allowed disabled:bg-mist disabled:text-navy-900/65",
  "aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/15",
].join(" ");

export function Label({
  className,
  children,
  htmlFor,
  required,
}: {
  className?: string;
  children: ReactNode;
  htmlFor: string;
  required?: boolean;
}) {
  return (
    <LabelPrimitive.Root
      htmlFor={htmlFor}
      className={cn("block text-[0.75rem] font-semibold text-navy-900", className)}
    >
      {children}
      {required ? (
        <span className="ml-1 text-gold-800" aria-hidden="true">
          *
        </span>
      ) : null}
    </LabelPrimitive.Root>
  );
}

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** Label + control + hint + error, wired together for screen readers. */
export function Field({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-navy-900/65">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlBase, "h-10", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlBase, "min-h-24 py-2.5 leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          controlBase,
          "h-10 cursor-pointer appearance-none bg-white pr-10",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-navy-900/65"
      >
        <path
          d="M3 6l5 5 5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function Checkbox({
  id,
  label,
  description,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; description?: string }) {
  return (
    <div className={cn("flex gap-2.5", className)}>
      <input
        id={id}
        type="checkbox"
        className={cn(
          "mt-0.5 size-4 shrink-0 cursor-pointer appearance-none rounded border border-navy-900/25 bg-white",
          "checked:border-gold-500 checked:bg-gold-500",
          "bg-[length:10px] bg-center bg-no-repeat",
          "checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22 stroke=%22%2307111f%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M3 8.5l3.5 3.5L13 5%22/></svg>')]",
          "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
        )}
        {...props}
      />
      <div className="text-[0.8125rem] leading-snug">
        <LabelPrimitive.Root htmlFor={id} className="cursor-pointer font-medium text-navy-900">
          {label}
        </LabelPrimitive.Root>
        {description ? <p className="text-navy-900/65">{description}</p> : null}
      </div>
    </div>
  );
}

/** Off-screen honeypot. Bots fill it in; humans never see it. */
export function Honeypot({ register }: { register?: Record<string, unknown> }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="company-website">Company website</label>
      <input id="company-website" tabIndex={-1} autoComplete="off" {...register} />
    </div>
  );
}
