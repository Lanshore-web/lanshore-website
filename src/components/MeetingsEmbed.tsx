import Script from "next/script";

function meetingsEmbedSrc(url: string): string {
  if (/[?&]embed=true(?:&|$)/.test(url)) return url;
  return url.includes("?") ? `${url}&embed=true` : `${url}?embed=true`;
}

/**
 * HubSpot Meetings scheduler. Returns null when HUBSPOT_MEETINGS_URL is unset
 * so contact/#book can omit the section entirely.
 *
 * Single server component with next/script (lazyOnload) is enough — HubSpot's
 * MeetingsEmbedCode.js scans for `.meetings-iframe-container` on load; no
 * client mount effect required.
 */
export default function MeetingsEmbed() {
  const url = process.env.HUBSPOT_MEETINGS_URL;
  if (!url) return null;

  const embedSrc = meetingsEmbedSrc(url);

  return (
    <div className="min-h-[650px] w-full">
      <div className="meetings-iframe-container" data-src={embedSrc} />
      <Script
        src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
