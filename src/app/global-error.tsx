"use client";

/**
 * Last-resort boundary: this replaces the root layout, so it cannot rely on any
 * of the app's providers, fonts or global styles being available.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07111f",
          color: "#ffffff",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.6875rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#E5C766",
            }}
          >
            Royalhouse Baltimore
          </p>
          <h1 style={{ margin: "1.25rem 0 0", fontSize: "2rem", fontWeight: 400 }}>
            We hit an unexpected error.
          </h1>
          <p style={{ margin: "1rem 0 0", lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
            Please reload the page. If this keeps happening, we would be grateful if you let us
            know.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.875rem 2rem",
              borderRadius: "999px",
              border: "none",
              background: "#C9A227",
              color: "#07111f",
              fontSize: "0.9375rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
          {error.digest ? (
            <p style={{ marginTop: "2rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
              Reference: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
