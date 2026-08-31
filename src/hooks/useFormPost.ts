"use client";

import { useCallback, useState } from "react";
import type { SubmissionResult } from "@/types";

type Status = "idle" | "submitting" | "success" | "error";

interface UseFormPost {
  status: Status;
  message: string;
  submit: (values: unknown) => Promise<SubmissionResult>;
  reset: () => void;
}

/** Shared POST + status handling for every form on the site. */
export function useFormPost(endpoint: string): UseFormPost {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const submit = useCallback(
    async (values: unknown): Promise<SubmissionResult> => {
      setStatus("submitting");
      setMessage("");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const result = (await response.json()) as SubmissionResult;

        if (!response.ok || !result.ok) {
          setStatus("error");
          setMessage(
            result.message || "Something went wrong on our side. Please try again in a moment.",
          );
          return result;
        }

        setStatus("success");
        setMessage(result.message);
        return result;
      } catch {
        setStatus("error");
        const fallback =
          "We could not reach the church server. Please check your connection and try again.";
        setMessage(fallback);
        return { ok: false, message: fallback };
      }
    },
    [endpoint],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setMessage("");
  }, []);

  return { status, message, submit, reset };
}
