import { z } from "zod";

/* ============================================================
   VALIDATION SCHEMAS
   Shared by the client forms and the API routes, so nothing is
   trusted from the browser. Every schema includes a honeypot
   field that must stay empty.
   ============================================================ */

const honeypot = z
  .string()
  .max(0, "Rejected")
  .optional()
  .transform((value) => value ?? "");

const name = z
  .string()
  .trim()
  .min(2, "Please enter at least 2 characters")
  .max(80, "That is longer than we can store");

const email = z
  .string()
  .trim()
  .min(1, "We need an email address to reply")
  .email("Please check that email address")
  .max(160);

const optionalPhone = z
  .string()
  .trim()
  .max(32)
  .refine((value) => value === "" || /^[\d\s()+.-]{7,32}$/.test(value), "Please check that number")
  .optional()
  .transform((value) => value ?? "");

/* ------------------------------ Plan a visit ------------------------------ */

export const planVisitSchema = z.object({
  firstName: name,
  lastName: name,
  email,
  phone: optionalPhone,
  adults: z.coerce.number().int().min(1, "At least one adult").max(20),
  children: z.coerce.number().int().min(0).max(20),
  preferredService: z.string().trim().max(80).optional().default(""),
  questions: z.string().trim().max(2000).optional().default(""),
  wantsContact: z.boolean().optional().default(false),
  consent: z.literal(true, {
    message: "Please confirm we can contact you about your visit",
  }),
  companyWebsite: honeypot,
});

export type PlanVisitInput = z.input<typeof planVisitSchema>;
export type PlanVisitData = z.output<typeof planVisitSchema>;

/* -------------------------------- Prayer --------------------------------- */

export const prayerCategories = [
  "Personal",
  "Family",
  "Health",
  "Career",
  "Relationships",
  "Spiritual Growth",
  "Other",
] as const;

export const prayerSchema = z.object({
  name: z.string().trim().max(80).optional().default(""),
  email: z.string().trim().email("Please check that email address").max(160).optional().or(z.literal("")),
  phone: optionalPhone,
  category: z.enum(prayerCategories),
  request: z
    .string()
    .trim()
    .min(10, "Please tell us a little more so we can pray specifically")
    .max(4000, "Please keep it under 4000 characters"),
  /** When true the request is seen only by the pastoral prayer team. */
  keepPrivate: z.boolean().optional().default(true),
  anonymous: z.boolean().optional().default(false),
  wantsFollowUp: z.boolean().optional().default(false),
  companyWebsite: honeypot,
});

export type PrayerInput = z.input<typeof prayerSchema>;

/* -------------------------------- Contact -------------------------------- */

export const contactReasons = [
  "General Question",
  "Prayer",
  "Membership",
  "Event",
  "Giving",
  "Media",
  "Pastoral Care",
  "Other",
] as const;

export const contactSchema = z.object({
  name,
  email,
  phone: optionalPhone,
  reason: z.enum(contactReasons),
  message: z
    .string()
    .trim()
    .min(10, "Please give us a little more detail")
    .max(4000, "Please keep it under 4000 characters"),
  companyWebsite: honeypot,
});

export type ContactInput = z.input<typeof contactSchema>;

/* ------------------------------- Testimony ------------------------------- */

export const testimonySchema = z.object({
  name,
  email,
  category: z.enum(["Salvation", "Healing", "Provision", "Family", "Freedom", "Community"]),
  testimony: z
    .string()
    .trim()
    .min(40, "Tell us the story, at least a few sentences")
    .max(6000, "Please keep it under 6000 characters"),
  /** Explicit permission is required before anything is ever published. */
  permissionToPublish: z.boolean().optional().default(false),
  anonymous: z.boolean().optional().default(false),
  companyWebsite: honeypot,
});

export type TestimonyInput = z.input<typeof testimonySchema>;

/* ------------------------------- Newsletter ------------------------------ */

export const newsletterSchema = z.object({
  email,
  consent: z.literal(true, { message: "Please agree to receive our emails" }),
  companyWebsite: honeypot,
});

export type NewsletterInput = z.input<typeof newsletterSchema>;
