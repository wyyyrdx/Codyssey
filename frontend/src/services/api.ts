import type { RunCodeRequest, ScenePayload } from "../types/scene";

const API_URL = "http://localhost:8000";

export async function runCode(data: RunCodeRequest): Promise<ScenePayload> {
  const res = await fetch(`${API_URL}/api/v1/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Something went wrong");
  }

  return res.json();
}