import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, from }: EmailRequest = await req.json();
    
    const MAILTRAP_TOKEN = Deno.env.get("MAILTRAP_API_TOKEN");
    
    if (!MAILTRAP_TOKEN) {
      console.error("MAILTRAP_API_TOKEN is not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Sending email to: ${to}, subject: ${subject}`);

    // Use Mailtrap Send API
    const response = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MAILTRAP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          email: from || "hello@physique57india.com",
          name: "Physique 57 India"
        },
        to: [{ email: to }],
        subject: subject,
        html: html,
      }),
    });

    const responseText = await response.text();
    console.log("Mailtrap response status:", response.status);
    console.log("Mailtrap response:", responseText);

    if (!response.ok) {
      console.error("Mailtrap API error:", responseText);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: responseText }),
        { status: response.status, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { message: "Email sent successfully" };
    }

    console.log("Email sent successfully");

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
