import { createHash } from "crypto";

const FB_API_VERSION = "v22.0";

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

interface UserData {
  email?: string;
  phone?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbc?: string;
  fbp?: string;
}

interface FbEvent {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  userData: UserData;
  customData?: Record<string, unknown>;
}

export async function sendFbEvent(event: FbEvent): Promise<void> {
  const pixelId = process.env.FB_PIXEL_ID;
  const accessToken = process.env.FB_ACCESS_TOKEN;

  if (!pixelId || !accessToken) return;

  const userData: Record<string, unknown> = {};
  if (event.userData.email) userData.em = [sha256(event.userData.email)];
  if (event.userData.phone) userData.ph = [sha256(event.userData.phone)];
  if (event.userData.clientIpAddress)
    userData.client_ip_address = event.userData.clientIpAddress;
  if (event.userData.clientUserAgent)
    userData.client_user_agent = event.userData.clientUserAgent;
  if (event.userData.fbc) userData.fbc = event.userData.fbc;
  if (event.userData.fbp) userData.fbp = event.userData.fbp;

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        ...(event.customData ? { custom_data: event.customData } : {}),
      },
    ],
  };

  try {
    await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
  } catch {
    // Silently fail — analytics should never break the user experience
  }
}
