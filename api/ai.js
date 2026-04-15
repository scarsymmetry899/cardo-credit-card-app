// api/ai.js — Vercel Serverless Function
// Proxies Anthropic API calls so your key never lives in the browser bundle.
//
// SETUP:
//   1. Deploy to Vercel (vercel deploy)
//   2. Go to Vercel Dashboard → Settings → Environment Variables
//   3. Add: ANTHROPIC_API_KEY = sk-ant-...
//
// In Cardo_v5.jsx, change:
//   const API_ENDPOINT = "https://api.anthropic.com/v1/messages";
// to:
//   const API_ENDPOINT = "/api/ai";

export const config = { runtime: "edge" };   // Edge runtime = lowest latency

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // CORS headers — restrict to your domain in production
  const corsHeaders = {
    "Access-Control-Allow-Origin": process.env.APP_ORIGIN || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Rate limiting guard: max_tokens cap to prevent runaway costs
    if (body.max_tokens > 2000) body.max_tokens = 2000;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error:", data);
      return new Response(
        JSON.stringify({ error: "AI service error", details: data }),
        { status: response.status, headers: corsHeaders }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: corsHeaders,
    });

  } catch (err) {
    console.error("Proxy error:", err);
    return new Response(
      JSON.stringify({ error: "Internal proxy error", message: err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}
