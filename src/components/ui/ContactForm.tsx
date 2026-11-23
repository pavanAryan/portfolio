"use client";

// Client component: it needs state (field errors, sending status) and runs
// the submit in the browser, so the page never reloads.

import { useState, type FormEvent } from "react";
import type { ContactContent } from "@/types";
import { primaryButton } from "@/components/ui/buttonStyles";

type ContactFormProps = {
  /** Formspree form ID, e.g. "xyzabcd". The form is hidden if missing. */
  formId?: string;
  text: ContactContent["form"];
  validation: ContactContent["validation"];
};

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

// Simple "something@something.something" check. Good enough for a contact form.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

export function ContactForm({ formId, text, validation }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  // No Formspree ID (e.g. .env.local not set up yet): show a friendly note.
  if (!formId) {
    return <p className="text-muted">{text.unavailable}</p>;
  }

  // Returns an error message per invalid field (empty object = all good).
  function validate(data: FormData): FieldErrors {
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const found: FieldErrors = {};

    if (!name) found.name = validation.nameRequired;
    if (!email) found.email = validation.emailRequired;
    else if (!EMAIL_PATTERN.test(email)) found.email = validation.emailInvalid;
    if (!message) found.message = validation.messageRequired;
    else if (message.length < MIN_MESSAGE_LENGTH)
      found.message = validation.messageTooShort;

    return found;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser's default full-page submit
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move keyboard focus to the first field with a problem.
      const firstInvalid = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: data,
        // Ask Formspree for a JSON reply instead of redirecting to its own page.
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Formspree error ${response.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  // Remove a field's error as soon as the visitor starts fixing it.
  function clearError(field: FieldName) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const isSubmitting = status === "submitting";

  return (
    // noValidate: turn off the browser's own popups so our messages are shown
    // consistently. The required/type attributes still help mobile keyboards
    // and autofill.
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field
        id="name"
        label={text.nameLabel}
        error={errors.name}
        onInput={() => clearError("name")}
        inputProps={{ type: "text", autoComplete: "name" }}
      />
      <Field
        id="email"
        label={text.emailLabel}
        error={errors.email}
        onInput={() => clearError("email")}
        inputProps={{ type: "email", autoComplete: "email", inputMode: "email" }}
      />
      <Field
        id="message"
        label={text.messageLabel}
        error={errors.message}
        onInput={() => clearError("message")}
        multiline
      />

      {/* Honeypot: hidden from people, but spam bots fill it in.
          Formspree silently drops any submission where it has a value. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={primaryButton}
        >
          {isSubmitting ? text.submitting : text.submit}
        </button>

        {/* aria-live: screen readers announce this text when it changes */}
        <p role="status" aria-live="polite" className="text-sm">
          {status === "success" && <span className="text-accent">{text.success}</span>}
          {status === "error" && <span className="text-danger">{text.error}</span>}
        </p>
      </div>
    </form>
  );
}

// One labelled input (or textarea) with its error message.
// Lives here because only this form uses it.

type FieldProps = {
  id: FieldName;
  label: string;
  error?: string;
  onInput: () => void;
  multiline?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

function Field({ id, label, error, onInput, multiline, inputProps }: FieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: id,
    required: true,
    onInput,
    // Screen readers say "invalid" and read the error message for this field.
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `block w-full rounded-md border bg-background px-3 py-2 text-foreground transition-colors focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent ${
      error ? "border-danger" : "border-border"
    }`,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} className={`${shared.className} resize-y`} />
      ) : (
        <input {...shared} {...inputProps} />
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
