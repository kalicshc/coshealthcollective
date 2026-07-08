/**
 * Server component that emits a JSON-LD structured-data block.
 * Build the payload with the helpers in src/lib/schema.ts.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
