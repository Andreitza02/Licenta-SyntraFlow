import "server-only";

type SupabaseJson =
  | string
  | number
  | boolean
  | null
  | { [key: string]: SupabaseJson }
  | SupabaseJson[];

type SupabaseRecord = Record<string, SupabaseJson>;

function getRequiredEnvironmentVariable(name: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY") {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured on the server.`);
  }

  return value;
}

function getSupabaseRestUrl(table: string) {
  const baseUrl = getRequiredEnvironmentVariable("SUPABASE_URL").replace(/\/$/, "");
  return `${baseUrl}/rest/v1/${table}`;
}

export function getSupabaseContactTable() {
  return process.env.SUPABASE_CONTACT_TABLE?.trim() || "contact_requests";
}

export async function insertSupabaseRow(table: string, row: SupabaseRecord) {
  const serviceRoleKey = getRequiredEnvironmentVariable("SUPABASE_SERVICE_ROLE_KEY");
  const response = await fetch(getSupabaseRestUrl(table), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify([row]),
  });

  if (!response.ok) {
    const errorPayload = await response.text();
    const errorMessage = errorPayload.trim() || `Supabase responded with ${response.status}.`;

    throw new Error(errorMessage);
  }

  const rows = (await response.json()) as SupabaseRecord[];
  return rows[0] ?? null;
}
