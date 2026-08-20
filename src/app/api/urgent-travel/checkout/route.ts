import { callMcpTool } from "@/lib/tutu-mcp";

interface CreateCheckoutLinkResult {
  checkout_url?: string;
  search_results_url?: string;
}

// Resolved on demand, at the moment the traveller clicks "Выбрать" — not
// pre-fetched for every row during the search — so a result set with many
// offers doesn't turn into that many extra MCP round trips before anyone
// has picked one.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Некорректное тело запроса" }, { status: 400 });
  }

  const payload = body.checkoutPayload as { transport?: unknown; ref?: unknown } | undefined;
  const transport = typeof payload?.transport === "string" ? payload.transport : "";
  const ref =
    payload?.ref && typeof payload.ref === "object"
      ? (payload.ref as Record<string, unknown>)
      : null;

  if (!transport || !ref) {
    return Response.json({ error: "Не хватает данных о варианте" }, { status: 400 });
  }

  try {
    // The tool's own contract: forward the offer's checkout_ref fields
    // verbatim alongside transport — it dispatches by transport/product_type
    // and builds the right deeplink per mode from there.
    const result = await callMcpTool<CreateCheckoutLinkResult>("create_checkout_link", {
      transport,
      ...ref,
    });
    const url = result.checkout_url ?? result.search_results_url ?? null;
    if (!url) {
      return Response.json({ error: "Ссылка на оформление не пришла" }, { status: 502 });
    }
    return Response.json({ url });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Не удалось получить ссылку" },
      { status: 502 },
    );
  }
}
