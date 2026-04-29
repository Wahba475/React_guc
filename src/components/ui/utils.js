/**
 * Minimal cn() utility — combines class names.
 * Acts as a stub for the shadcn lib/utils until a full shadcn init is run.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
