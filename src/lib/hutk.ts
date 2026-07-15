/** Read HubSpot visitor tracking cookie (set after consent on canonical hosts). */
export function getHutk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? match[1] : undefined;
}
