export type ValidationError = { field: string; message: string };

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: ValidationError[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isEmail(value: unknown): value is string {
  return typeof value === "string" && EMAIL_RE.test(value.trim());
}

export function validate(
  data: Record<string, unknown>,
  rules: Record<string, "string" | "email">
): ValidationResult<Record<string, string>> {
  const errors: ValidationError[] = [];
  const cleaned: Record<string, string> = {};
  for (const [field, kind] of Object.entries(rules)) {
    const value = data[field];
    if (kind === "string") {
      if (!isNonEmptyString(value)) {
        errors.push({ field, message: `${field} is required` });
      } else {
        cleaned[field] = value.trim();
      }
    } else if (kind === "email") {
      if (!isEmail(value)) {
        errors.push({ field, message: `${field} must be a valid email address` });
      } else {
        cleaned[field] = (value as string).trim();
      }
    }
  }
  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, data: cleaned };
}
