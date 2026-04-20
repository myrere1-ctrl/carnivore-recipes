import { useState } from "react";

const CHANNEL_ID = "UCvasvPW5q8Wwblqb_-6CkPw";
const CHANNEL_NAME = "Steak and Butter Gal";
const PROXY = "https://aged-limit-a56c.myrere1.workers.dev";

function proxyFetch(ytUrl) {
  return fetch(`${PROXY}?url=${encodeURIComponent(ytUrl)}`);
}

const S = {
  gold: "#c8a96e", dark: "#080808", card: "#0d0d0d",
  border: "#1e1e1e", text: "#f5f0e8", muted: "#666",
  green: "#7fb3a0", orange: "#d4845a",
};
const mono = "'Courier New', monospace";
const serif = "'Playfair Display', Georgia, serif";
const bodyF = "'Crimson Text', Georgia, serif";

// ── Setup Screen ─────────────────────────────────────────────
function SetupScreen({ onConnect }) {
  const [ytKey, setYtKey] = useState("");
  const [claudeKey, setClaudeKey] = useState("");
  const [showYt, setShowYt] = useState(false);
  const [showClaude, setShowClaude] = useState(false);
  const ready = ytKey.trim().length > 10 && claudeKey.trim().length > 10;

  return (
    <div style={{ minHeight: "100vh", background: S.dark, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Crimson+Text:ital,wght@0,400;1,400&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #333 !important; }
      `}</style>
      <div style={{ maxWidth: 420, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>🥩</div>
          <h1 style={{ fontFamily: serif, color: S.text, fontSize: 26, fontWeight: 900, margin: "0 0 4px" }}>
            Steak & Butter Gal
          </h1>
          <p style={{ color: S.muted, fontFamily: mono, fontSize: 9, letterSpacing: 3, margin: 0 }}>
            CARNIVORE RECIPE EXTRACTOR
          </p>
        </div>

        <div style={{ background: S.card, border: `1px solid ${S.border}`, padding: 28, position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${S.gold},transparent)` }} />
          <p style={{ color: "#444", fontFamily: mono, fontSize: 8, letterSpacing: 2, margin: "0 0 22px" }}>
            ENTER YOUR API KEYS — STORED IN MEMORY ONLY
          </p>

          {[
            { label: "▶ YOUTUBE DATA API v3", val: ytKey, set: setYtKey, show: showYt, setShow: setShowYt, ph: "AIzaSy..." },
            { label: "◆ ANTHROPIC CLAUDE API", val: claudeKey, set: setClaudeKey, show: showClaude, setShow: setShowClaude, ph: "sk-ant-api03-..." },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 18 }}>
              <label style={{ color: S.gold, fontFamily: mono, fontSize: 8, letterSpacing: 2, display: "block", marginBottom: 7 }}>
                {f.label}
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={f.show ? "text" : "password"}
                  value={f.val}
                  onChange={e => f.set(e.target.value)}
                  placeholder={f.ph}
                  style={{ width: "100%", background: "#111", border: `1px solid #2a2a2a`, color: S.text, padding: "10px 36px 10px 12px", fontFamily: mono, fontSize: 11, outline: "none" }}
                  onFocus={e => e.target.style.borderColor = S.gold}
                  onBlur={e => e.target.style.borderColor = "#2a2a2a"}
                />
                <button onClick={() => f.setShow(!f.show)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: S.muted, cursor: "pointer", fontSize: 13 }}>
                  {f.show ? "🙈" : "👁"}
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => ready && onConnect(ytKey.trim(), claudeKey.trim())}
            disabled={!ready}
            style={{ width: "100%", padding: 13, marginTop: 8, background: ready ? S.gold : "#181818", border: "none", color: ready ? "#000" : "#333", fontFamily: mono, fontSize: 10, letterSpacing: 3, fontWeight: 700, cursor: ready ? "pointer" : "not-allowed", transition: "all 0.2s" }}
          >
            CONNECT & LOAD RECIPES →
          </button>

          <p style={{ color: "#252525", fontFamily: mono, fontSize: 8, margin: "12px 0 0", textAlign: "center" }}>
            🔒 Keys hanya di memory browser · Tidak disimpan
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Recipe Card ──────────────────────────────────────────────
function RecipeCard({ recipe, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onClick(recipe)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: S.card, border: `1px solid ${hov ? S.gold : S.border}`, cursor: "pointer", transition: "all 0.25s", overflow: "hidden", transform: hov ? "translateY(-3px)" : "none", boxShadow: hov ? `0 16px 48px rgba(200,169,110,0.12)` : "none" }}>
      <div style={{ position: "relative", height: 150, background: "#111", overflow: "hidden" }}>
        {recipe.thumbnail
          ? <img src={recipe.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>🥩</div>}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
        {recipe.extracted && (
          <div style={{ position: "absolute", top: 8, right: 8, background: S.gold, color: "#000", fontFamily: mono, fontSize: 7, letterSpacing: 1, padding: "3px 7px", fontWeight: 700 }}>
            ✓ EXTRACTED
          </div>
        )}
      </div>
      <div style={{ padding: "13px 15px 15px" }}>
        <h3 style={{ color: S.text, fontFamily: serif, fontSize: 13, fontWeight: 700, margin: "0 0 5px", lineHeight: 1.35 }}>{recipe.title}</h3>
        {recipe.summary
          ? <p style={{ color: "#777", fontFamily: bodyF, fontStyle: "italic", fontSize: 11, lineHeight: 1.5, margin: "0 0 10px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{recipe.summary}</p>
          : <p style={{ color: "#444", fontFamily: mono, fontSize: 9, letterSpacing: 1, margin: "0 0 10px" }}>🤖 Tap to extract with Claude AI</p>}
        <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 9, display: "flex", justifyContent: "space-between" }}>
          {recipe.extracted
            ? <span style={{ color: S.green, fontFamily: mono, fontSize: 8 }}>{recipe.category || "CARNIVORE"} · {recipe.time || "—"}</span>
            : <span style={{ color: "#333", fontFamily: mono, fontSize: 8 }}>NOT YET EXTRACTED</span>}
          <span style={{ color: S.gold, fontFamily: mono, fontSize: 8 }}>VIEW →</span>
        </div>
      </div>
    </div>
  );
}

// ── Recipe Modal ─────────────────────────────────────────────
function RecipeModal({ recipe, claudeKey, onClose, onExtracted }) {
  const [tab, setTab] = useState("ingredients");
  const [loading, setLoading] = useState(!recipe.extracted);
  const [error, setError] = useState(null);

  useState(() => { if (!recipe.extracted) extractRecipe(); });

  async function extractRecipe() {
    setLoading(true); setError(null);
    try {
      const prompt = `You are a carnivore recipe extractor. From the YouTube video title and description below, create a structured halal carnivore recipe. No pork or haram ingredients.

Title: ${recipe.title}
Description: ${(recipe.description || "").slice(0, 1800)}

Respond ONLY with valid JSON (no markdown, no backticks):
{"summary":"1-2 sentence description","category":"Beef|Seafood|Eggs|Organ Meat|Poultry|Lamb","time":"X min","difficulty":"Easy|Medium|Hard","servings":2,"calories":500,"protein":40,"fat":35,"carbs":0,"ingredients":[{"amount":"200g","item":"name"}],"steps":["step 1","step 2"],"tips":"optional tip"}`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": claudeKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error?.message || `Claude error ${res.status}`);
      }
      const data = await res.json();
      const raw = (data.content || []).map(b => b.text || "").join("");
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      onExtracted(recipe.id, parsed);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 12, backdropFilter: "blur(6px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0d0d0d", border: `1px solid ${S.gold}`, maxWidth: 560, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: `0 30px 100px rgba(200,169,110,0.18)` }}>

        <div style={{ position: "relative", height: 180, background: "#111" }}>
          {recipe.thumbnail && <img src={recipe.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.2) 60%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 20px 16px" }}>
            <h2 style={{ fontFamily: serif, color: S.text, fontSize: 17, fontWeight: 900, margin: "0 0 3px", lineHeight: 1.2 }}>{recipe.title}</h2>
            <p style={{ color: S.gold, fontFamily: mono, fontSize: 8, letterSpacing: 2, margin: 0 }}>
              {CHANNEL_NAME.toUpperCase()}{recipe.category ? ` · ${recipe.category}` : ""}{recipe.time ? ` · ${recipe.time}` : ""}
            </p>
          </div>
          <button onClick={onClose} style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.75)", border: `1px solid #333`, color: "#888", width: 28, height: 28, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        {loading && (
          <div style={{ padding: "36px 20px", textAlign: "center" }}>
            <p style={{ color: S.gold, fontFamily: mono, fontSize: 9, letterSpacing: 2, margin: "0 0 8px" }}>🤖 CLAUDE AI IS EXTRACTING RECIPE...</p>
            <p style={{ color: "#333", fontFamily: mono, fontSize: 8 }}>Analyzing video title & description</p>
          </div>
        )}

        {!loading && error && (
          <div style={{ padding: 20 }}>
            <div style={{ background: "#150808", border: "1px solid #4a1010", padding: 14, color: "#d88", fontFamily: mono, fontSize: 9 }}>
              ⚠ {error}
              <button onClick={extractRecipe} style={{ display: "block", marginTop: 10, background: "none", border: `1px solid #c66`, color: "#c66", padding: "5px 12px", cursor: "pointer", fontFamily: mono, fontSize: 8 }}>RETRY</button>
            </div>
          </div>
        )}

        {!loading && recipe.extracted && (
          <>
            <div style={{ display: "flex", background: "#0a0a0a", borderBottom: `1px solid ${S.border}` }}>
              {[{ l: "KCAL", v: recipe.calories, c: S.gold }, { l: "PRO", v: `${recipe.protein}g`, c: S.green }, { l: "FAT", v: `${recipe.fat}g`, c: S.orange }, { l: "CARBS", v: `${recipe.carbs}g`, c: "#555" }, { l: "SERVES", v: recipe.servings, c: "#666" }].map(m => (
                <div key={m.l} style={{ flex: 1, textAlign: "center", padding: "10px 4px", borderRight: `1px solid ${S.border}` }}>
                  <div style={{ color: m.c, fontFamily: mono, fontSize: 13, fontWeight: 700 }}>{m.v}</div>
                  <div style={{ color: "#2a2a2a", fontFamily: mono, fontSize: 7, letterSpacing: 1 }}>{m.l}</div>
                </div>
              ))}
            </div>

            {recipe.summary && (
              <div style={{ padding: "12px 20px", borderBottom: `1px solid ${S.border}` }}>
                <p style={{ color: "#999", fontFamily: bodyF, fontStyle: "italic", fontSize: 13, lineHeight: 1.55, margin: 0 }}>{recipe.summary}</p>
              </div>
            )}

            <div style={{ display: "flex", borderBottom: `1px solid ${S.border}` }}>
              {["ingredients", "steps"].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "11px 0", background: "none", border: "none", borderBottom: tab === t ? `2px solid ${S.gold}` : "2px solid transparent", color: tab === t ? S.gold : "#3a3a3a", fontFamily: mono, fontSize: 8, letterSpacing: 2, cursor: "pointer", textTransform: "uppercase" }}>{t}</button>
              ))}
            </div>

            <div style={{ padding: "16px 20px 24px" }}>
              {tab === "ingredients"
                ? (recipe.ingredients || []).map((ing, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid #111` }}>
                      <span style={{ color: S.gold, fontFamily: mono, fontSize: 11, fontWeight: 700, minWidth: 60, flexShrink: 0 }}>{ing.amount}</span>
                      <span style={{ color: "#ccc", fontSize: 13, fontFamily: bodyF }}>{ing.item}</span>
                    </div>))
                : <>
                    {(recipe.steps || []).map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                        <div style={{ width: 22, height: 22, background: S.gold, color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                        <p style={{ color: "#bbb", fontSize: 13, lineHeight: 1.65, margin: 0, fontFamily: bodyF }}>{step}</p>
                      </div>))}
                    {recipe.tips && (
                      <div style={{ marginTop: 14, padding: 12, background: "#0f0b06", border: `1px solid #251c0a` }}>
                        <p style={{ color: "#8a7040", fontFamily: mono, fontSize: 8, letterSpacing: 2, margin: "0 0 5px" }}>💡 PRO TIP</p>
                        <p style={{ color: "#888", fontFamily: bodyF, fontStyle: "italic", fontSize: 12, margin: 0 }}>{recipe.tips}</p>
                      </div>
                    )}
                  </>}
            </div>

            <div style={{ padding: "0 20px 20px" }}>
              <a href={`https://youtube.com/watch?v=${recipe.videoId}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", padding: 10, background: "#0f0f0f", border: `1px solid #2a2a2a`, color: "#cc2222", fontFamily: mono, fontSize: 8, letterSpacing: 2, textDecoration: "none" }}>
                ▶ WATCH ON YOUTUBE
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────
export default function App() {
  const [keys, setKeys] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [nextToken, setNextToken] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  async function fetchVideos(ytKey, pageToken = null) {
    setLoading(true); setError(null);
    setLoadMsg(pageToken ? "Loading more..." : "Fetching from YouTube...");
    try {
      let ytUrl = `https://www.googleapis.com/youtube/v3/search`
        + `?part=snippet`
        + `&channelId=${CHANNEL_ID}`
        + `&type=video`
        + `&maxResults=12`
        + `&order=date`
        + `&key=${ytKey}`;

      if (pageToken) ytUrl += `&pageToken=${pageToken}`;

      const res = await proxyFetch(ytUrl);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      const items = (data.items || []).map(item => ({
        id: item.id.videoId,
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails?.medium?.url,
        extracted: false,
      }));

      setVideos(prev => pageToken ? [...prev, ...items] : items);
      setNextToken(data.nextPageToken || null);
      setHasMore(!!data.nextPageToken);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false); setLoadMsg("");
    }
  }

  function handleConnect(ytKey, claudeKey) {
    setKeys({ yt: ytKey, claude: claudeKey });
    fetchVideos(ytKey);
  }

  function handleExtracted(videoId, data) {
    setVideos(prev => prev.map(v => v.id === videoId ? { ...v, ...data, extracted: true } : v));
    setSelected(prev => prev?.id === videoId ? { ...prev, ...data, extracted: true } : prev);
  }

  const filtered = videos.filter(v => v.title.toLowerCase().includes(search.toLowerCase()));

  if (!keys) return <SetupScreen onConnect={handleConnect} />;

  return (
    <div style={{ minHeight: "100vh", background: S.dark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Crimson+Text:ital,wght@0,400;1,400&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${S.gold}; }
        input::placeholder { color: #2a2a2a !important; }
      `}</style>

      <div style={{ padding: "28px 20px 20px", textAlign: "center", background: "linear-gradient(180deg,#0f0a04,#080808)", borderBottom: `1px solid ${S.border}`, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${S.gold},transparent)` }} />
        <p style={{ color: S.gold, fontFamily: mono, fontSize: 7, letterSpacing: 5, margin: "0 0 6px", opacity: 0.7 }}>◆ LIVE FROM YOUTUBE ◆</p>
        <h1 style={{ fontFamily: serif, color: S.text, fontSize: "clamp(20px,5vw,38px)", fontWeight: 900, margin: "0 0 3px" }}>Steak & Butter Gal</h1>
        <p style={{ color: S.muted, fontFamily: bodyF, fontStyle: "italic", fontSize: 13, margin: "0 0 16px" }}>Carnivore Recipes · Claude AI Extraction · 100% Halal</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          {[{ v: videos.length, l: "VIDEOS" }, { v: videos.filter(x => x.extracted).length, l: "EXTRACTED" }, { v: "0g", l: "CARBS" }].map(s => (
            <div key={s.l}>
              <div style={{ color: S.gold, fontFamily: mono, fontSize: 15, fontWeight: 700 }}>{s.v}</div>
              <div style={{ color: "#333", fontFamily: mono, fontSize: 7, letterSpacing: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "12px 20px", background: "#0a0a0a", borderBottom: `1px solid #111`, display: "flex", gap: 10 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search videos..."
          style={{ flex: 1, background: "#111", border: `1px solid #222`, color: S.text, padding: "8px 12px", fontFamily: mono, fontSize: 10, outline: "none" }} />
        <button onClick={() => { setKeys(null); setVideos([]); }}
          style={{ background: "none", border: `1px solid #222`, color: "#444", padding: "8px 12px", fontFamily: mono, fontSize: 7, letterSpacing: 2, cursor: "pointer" }}>
          DISCONNECT
        </button>
      </div>

      {error && (
        <div style={{ padding: "16px 20px" }}>
          <div style={{ background: "#150808", border: "1px solid #4a1010", padding: 14, color: "#d88", fontFamily: mono, fontSize: 9, maxWidth: 600, margin: "0 auto" }}>
            ⚠ {error}
            <button onClick={() => fetchVideos(keys.yt)} style={{ marginLeft: 12, background: "none", border: `1px solid #c66`, color: "#c66", padding: "4px 10px", cursor: "pointer", fontFamily: mono, fontSize: 8 }}>RETRY</button>
          </div>
        </div>
      )}

      {loading && (
        <div style={{ padding: "50px 20px", textAlign: "center" }}>
          <p style={{ color: S.gold, fontFamily: mono, fontSize: 9, letterSpacing: 2 }}>⏳ {loadMsg}</p>
        </div>
      )}

      {!loading && (
        <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14, maxWidth: 1080, margin: "0 auto" }}>
          {filtered.map(r => <RecipeCard key={r.id} recipe={r} onClick={setSelected} />)}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "50px 20px", color: "#333", fontFamily: mono, fontSize: 9, letterSpacing: 2 }}>NO VIDEOS FOUND</div>
          )}
        </div>
      )}

      {hasMore && !loading && (
        <div style={{ textAlign: "center", padding: "0 0 36px" }}>
          <button onClick={() => fetchVideos(keys.yt, nextToken)}
            style={{ background: "none", border: `1px solid ${S.gold}`, color: S.gold, padding: "9px 24px", fontFamily: mono, fontSize: 8, letterSpacing: 2, cursor: "pointer" }}>
            LOAD MORE ↓
          </button>
        </div>
      )}

      <div style={{ borderTop: `1px solid #111`, padding: "14px 20px", textAlign: "center" }}>
        <p style={{ color: "#1e1e1e", fontFamily: mono, fontSize: 7, letterSpacing: 2, margin: 0 }}>
          YOUTUBE API v3 + CLAUDE AI + CF WORKER · @STEAKANDBUTTERGAL
        </p>
      </div>

      {selected && (
        <RecipeModal recipe={selected} claudeKey={keys.claude} onClose={() => setSelected(null)} onExtracted={handleExtracted} />
      )}
    </div>
  );
}
