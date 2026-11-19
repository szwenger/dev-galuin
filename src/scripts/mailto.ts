// Builds a mailto: draft. Every value is percent-encoded, newlines become CRLF.
export function buildMailto(to: string, name: string, email: string, message: string, subject = 'Hello'): string {
  const body = `${message}\n\n${name}\n${email}`.replace(/\r?\n/g, '\r\n');
  return `mailto:${to}?subject=${encodeURIComponent(`${subject} (${name})`)}&body=${encodeURIComponent(body)}`;
}
