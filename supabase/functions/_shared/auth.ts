import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Validates the authorization header and returns the user ID if valid.
 * Returns null if no auth header or invalid.
 */
export async function validateAuth(req: Request): Promise<{ userId: string | null; error: string | null }> {
  const authHeader = req.headers.get("Authorization");
  
  if (!authHeader) {
    return { userId: null, error: "Missing authorization header" };
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return { userId: null, error: "Invalid or expired token" };
    }

    return { userId: user.id, error: null };
  } catch (e) {
    console.error("Auth validation error:", e);
    return { userId: null, error: "Authentication failed" };
  }
}

/**
 * Returns an unauthorized response
 */
export function unauthorizedResponse(message = "Unauthorized"): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

/**
 * Returns a bad request response for validation errors
 */
export function badRequestResponse(message: string, details?: unknown): Response {
  return new Response(
    JSON.stringify({ error: message, details }),
    {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

// Input validation helpers
export function validateString(value: unknown, name: string, minLength = 1, maxLength = 10000): string | null {
  if (typeof value !== "string") {
    return `${name} must be a string`;
  }
  if (value.length < minLength) {
    return `${name} must be at least ${minLength} characters`;
  }
  if (value.length > maxLength) {
    return `${name} must be at most ${maxLength} characters`;
  }
  return null;
}

export function validateArray(value: unknown, name: string, minLength = 0, maxLength = 100): string | null {
  if (!Array.isArray(value)) {
    return `${name} must be an array`;
  }
  if (value.length < minLength) {
    return `${name} must have at least ${minLength} items`;
  }
  if (value.length > maxLength) {
    return `${name} must have at most ${maxLength} items`;
  }
  return null;
}

export function validateEnum<T extends string>(value: unknown, name: string, validValues: T[]): string | null {
  if (typeof value !== "string" || !validValues.includes(value as T)) {
    return `${name} must be one of: ${validValues.join(", ")}`;
  }
  return null;
}

export function validateOptionalString(value: unknown, name: string, maxLength = 10000): string | null {
  if (value === undefined || value === null) {
    return null;
  }
  return validateString(value, name, 0, maxLength);
}
