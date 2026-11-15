// A value in square brackets is a placeholder: the client has not supplied it. It prints as a dashed timber mark.
// Input is ours (site.config.ts), never visitor text, but it is escaped anyway.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function ph(text: string): string {
  return esc(text).replace(/\[[^\]]+\]/g, (m) => `<span class="ph">${m}</span>`);
}

/** The WhatsApp link for the header button and later the order. Placeholder number until the client gives one. */
export function waLink(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
