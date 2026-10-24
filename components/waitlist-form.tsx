"use client";

// Demo-only form: validates in the browser and shows a demo notice.
// Intentionally makes no network requests and stores nothing
// (no fetch/XHR, no localStorage/sessionStorage/cookies, no logging).

import { useEffect, useRef, useState, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "nombre" | "email";
type Errors = Partial<Record<FieldName, string>>;

function validateField(name: FieldName, value: string): string | undefined {
  if (name === "nombre") {
    return value.trim().length > 0 ? undefined : "Escribe tu nombre.";
  }
  if (value.trim() === "") return "Escribe tu correo electrónico.";
  return EMAIL_RE.test(value.trim())
    ? undefined
    : "Revisa el formato del correo (por ejemplo, nombre@dominio.com).";
}

export function WaitlistForm() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    nombre: "",
    email: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const nombreRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Once the demo notice is shown, move focus to it so screen readers announce it.
  useEffect(() => {
    if (submitted) resultRef.current?.focus();
  }, [submitted]);

  function handleChange(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear an error as soon as the visitor fixes that field.
    if (errors[name] && !validateField(name, value)) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {
      nombre: validateField("nombre", values.nombre),
      email: validateField("email", values.email),
    };
    setErrors(next);

    if (next.nombre) {
      nombreRef.current?.focus();
      return;
    }
    if (next.email) {
      emailRef.current?.focus();
      return;
    }

    // Valid demo submission: no data is sent or saved. Only the notice is shown.
    setSubmitted(true);
  }

  return (
    <>
      <form
        className="demo-form"
        id="demo-form"
        noValidate
        onSubmit={handleSubmit}
        hidden={submitted}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <input
            ref={nombreRef}
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="given-name"
            required
            value={values.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            aria-invalid={errors.nombre ? "true" : undefined}
            aria-describedby="nombre-error"
          />
          <p className="field-error" id="nombre-error" role="alert" hidden={!errors.nombre}>
            {errors.nombre}
          </p>
        </div>
        <div className="field">
          <label htmlFor="email">Correo electrónico</label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby="email-error"
          />
          <p className="field-error" id="email-error" role="alert" hidden={!errors.email}>
            {errors.email}
          </p>
        </div>
        <button className="btn btn-cta" type="submit">
          Unirme a la lista (demo)
        </button>
      </form>

      <div
        className="demo-result"
        id="demo-result"
        role="status"
        tabIndex={-1}
        ref={resultRef}
        hidden={!submitted}
      >
        <p>
          <strong>Esto es una demo.</strong> No hemos enviado ni guardado tus
          datos. Ninguna información se ha transmitido a ningún servicio.
        </p>
      </div>
    </>
  );
}
