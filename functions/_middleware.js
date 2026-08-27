const COOKIE_NAME = "__Host-qingyuan_ai_design_session";
const SESSION_SECONDS = 30 * 24 * 60 * 60;
const SESSION_MESSAGE = "qingyuan-ai-design-authorized-v1";

const encoder = new TextEncoder();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readCookie(request, name) {
  const cookieHeader = request.headers.get("Cookie") || "";
  for (const item of cookieHeader.split(";")) {
    const separator = item.indexOf("=");
    if (separator < 0) continue;
    if (item.slice(0, separator).trim() === name) return item.slice(separator + 1).trim();
  }
  return "";
}

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function createSessionToken(password) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(SESSION_MESSAGE));
  return toBase64Url(new Uint8Array(signature));
}

function safeNextPath(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

function loginPage({ error = "", next = "/" } = {}) {
  const errorBlock = error
    ? `<p class="error" role="alert">${escapeHtml(error)}</p>`
    : `<p class="error" aria-hidden="true"></p>`;

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#9f382d">
  <title>访问验证 · 清园 AI 场景化原型</title>
  <style>
    *{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:"PingFang SC","Microsoft YaHei",Arial,sans-serif;color:#2b2722}body{min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 50% 20%,rgba(184,126,75,.24),transparent 32%),linear-gradient(145deg,#e8dfd1 0%,#f6f0e7 48%,#d9c9b5 100%)}body:before{position:fixed;inset:0;opacity:.25;background-image:linear-gradient(rgba(111,79,47,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(111,79,47,.06) 1px,transparent 1px);background-size:44px 44px;content:"";pointer-events:none}.panel{position:relative;width:min(410px,100%);padding:38px 40px 30px;border:1px solid rgba(255,255,255,.8);border-radius:16px;background:rgba(255,253,249,.98);box-shadow:0 28px 70px rgba(66,43,25,.24)}.heading{display:flex;align-items:center;gap:14px;padding-bottom:24px;margin-bottom:24px;border-bottom:1px solid #e9dfd3}.mark{width:48px;height:48px;display:grid;place-items:center;flex:0 0 auto;border-radius:10px;background:linear-gradient(145deg,#b74a3c,#892a22);box-shadow:0 8px 18px rgba(143,47,36,.25);color:#fff;font-family:"Songti SC",serif;font-size:22px}.heading h1{margin:0;color:#2e2721;font-size:19px;font-weight:600;letter-spacing:.02em}.heading p{margin:5px 0 0;color:#8b7d70;font-size:12px}label{display:block;margin-bottom:8px;color:#675d54;font-size:12px}input{width:100%;height:46px;padding:0 13px;border:1px solid #d9cdc0;border-radius:7px;background:#fff;color:#2b2722;font:inherit;outline:none}input:focus{border-color:#a53a2f;box-shadow:0 0 0 3px rgba(165,58,47,.1)}.error{min-height:20px;margin:7px 0 9px;color:#b8362d;font-size:12px}button{width:100%;height:46px;border:0;border-radius:7px;background:#a53a2f;box-shadow:0 7px 16px rgba(165,58,47,.2);color:#fff;font:inherit;cursor:pointer}button:hover{background:#8f3027}.footnote{margin:20px 0 0;color:#9b9085;text-align:center;font-size:11px}
  </style>
</head>
<body>
  <main class="panel">
    <div class="heading"><span class="mark">清园</span><div><h1>清园 AI 场景化原型</h1><p>请输入访问密码</p></div></div>
    <form method="post" action="/login">
      <input type="hidden" name="next" value="${escapeHtml(next)}">
      <label for="password">访问密码</label>
      <input id="password" name="password" type="password" autocomplete="current-password" autofocus required>
      ${errorBlock}
      <button type="submit">进入原型</button>
    </form>
    <p class="footnote">项目原型资料 · 请勿向外部转发</p>
  </main>
</body>
</html>`;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const configuredPassword = String(env.SITE_PASSWORD || "");

  if (!configuredPassword) {
    return new Response("Cloudflare Pages 尚未配置 SITE_PASSWORD", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" }
    });
  }

  const expectedToken = await createSessionToken(configuredPassword);

  if (url.pathname === "/login" && request.method === "POST") {
    const formData = await request.formData();
    const submittedPassword = String(formData.get("password") || "");
    const next = safeNextPath(String(formData.get("next") || "/"));

    if (submittedPassword !== configuredPassword) {
      return new Response(loginPage({ error: "密码错误，请重新输入", next }), {
        status: 401,
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }
      });
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: next,
        "Set-Cookie": `${COOKIE_NAME}=${expectedToken}; Path=/; Max-Age=${SESSION_SECONDS}; HttpOnly; Secure; SameSite=Lax`,
        "Cache-Control": "no-store"
      }
    });
  }

  if (url.pathname === "/login") {
    const next = safeNextPath(url.searchParams.get("next") || "/");
    return new Response(loginPage({ next }), {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }
    });
  }

  if (readCookie(request, COOKIE_NAME) === expectedToken) return context.next();

  const next = `${url.pathname}${url.search}`;
  return new Response(null, {
    status: 302,
    headers: { Location: `/login?next=${encodeURIComponent(next)}`, "Cache-Control": "no-store" }
  });
}
