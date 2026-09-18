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
      className={cn("block type-label text-navy-900", className)}
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
  return <input className={cn(controlBase, "h-11", className)} {...props} />;
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
          "h-11 cursor-pointer appearance-none bg-white pr-10",
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
    <label
      htmlFor={id}
      className={cn("group/check flex cursor-pointer gap-3 select-none", className)}
    >
      <span className="relative mt-0.5 size-5 shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[5px] border-2 bg-white transition-[background-color,border-color,box-shadow,transform] duration-150",
            "border-navy-900/30 group-hover/check:border-navy-900/55",
            "peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:shadow-subtle",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-500",
            "peer-active:scale-95",
          )}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="pointer-events-none absolute inset-0 m-auto size-3.5 text-gold-400 opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8.5 6.5 12 13 4.5" />
        </svg>
      </span>
      <span className="min-w-0 text-[0.875rem] leading-snug">
        <span className="font-medium text-navy-900">{label}</span>
        {description ? <span className="mt-0.5 block text-navy-900/65">{description}</span> : null}
      </span>
    </label>
  );
}

/** Hidden honeypot. Never visible to people; bots that fill it are rejected server-side. */
export function Honeypot({ register }: { register?: Record<string, unknown> }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden opacity-0"
    >
      <label htmlFor="company-website" className="sr-only">
        Leave this field blank
      </label>
      <input
        id="company-website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register}
      />
    </div>
  );
}
