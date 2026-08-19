const MCP_ENDPOINT = "https://mcp.tutu.ru/mcp";

interface McpToolResult {
  content?: Array<{ type: string; text?: string }>;
  isError?: boolean;
}

interface McpEnvelope {
  jsonrpc: "2.0";
  id: number;
  result?: McpToolResult;
  error?: { code: number; message: string };
}

let requestId = 0;

export async function callMcpTool<T>(name: string, args: Record<string, unknown>): Promise<T> {
  const response = await fetch(MCP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: ++requestId,
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });

  if (!response.ok) {
    throw new Error(`tutu-mcp: HTTP ${response.status} calling ${name}`);
  }

  const envelope = (await response.json()) as McpEnvelope;

  if (envelope.error) {
    throw new Error(`tutu-mcp: ${name} failed — ${envelope.error.message}`);
  }

  const result = envelope.result;
  const text = result?.content?.[0]?.text;

  if (result?.isError || !text) {
    throw new Error(`tutu-mcp: ${name} failed — ${text ?? "empty response"}`);
  }

  return JSON.parse(text) as T;
}
