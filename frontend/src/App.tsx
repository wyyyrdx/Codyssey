import { useState } from "react";
import { runCode } from "./services/api";
import type { ScenePayload } from "./types/scene";

function App() {
  const [code, setCode] = useState("x = 5");
  const [result, setResult] = useState<ScenePayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRun() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await runCode({ code });
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Error happened");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Codyssey</h1>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={8}
        cols={50}
        style={{ width: "100%", maxWidth: "500px", padding: "10px" }}
      />

      <br /><br />

      <button onClick={handleRun} disabled={loading}>
        {loading ? "Running..." : "Run"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "15px" }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <pre style={{ background: "#f0f0f0", padding: "10px" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;