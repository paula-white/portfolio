import { next, rewrite } from '@vercel/functions'

/*
 * Password lock for the case studies (Vercel Routing Middleware).
 * The homepage stays public. /work/* pages and images, and the case-study code in /cs/*,
 * are only served once the visitor has entered PORTFOLIO_PASSWORD (set in Vercel → Settings → Environment Variables).
 */
export const config = { matcher: ['/work/:path*', '/cs/:path*', '/unlock'] }

const COOKIE = 'pw_cases'
const MONTH = 60 * 60 * 24 * 30

async function token(password: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`portfolio-cases:${password.trim().toLowerCase()}`))
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('')
}

function cookieValue(req: Request) {
  const raw = req.headers.get('cookie') ?? ''
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=')
    if (k === COOKIE) return v.join('=')
  }
  return ''
}

const safePath = (p: unknown) => (typeof p === 'string' && /^\/work\/[a-z0-9-]+$/.test(p) ? p : '/')
const isFile = (path: string) => /\.[a-z0-9]+$/i.test(path)

export default async function middleware(req: Request) {
  const url = new URL(req.url)
  const password = process.env.PORTFOLIO_PASSWORD ?? ''
  const want = password ? await token(password) : 'locked'

  if (url.pathname === '/unlock') {
    if (req.method !== 'POST') return Response.redirect(new URL('/', url), 303)
    const form = await req.formData()
    const to = safePath(form.get('next'))
    const ok = !!password && (await token(String(form.get('password') ?? ''))) === want
    const headers = new Headers({ Location: ok ? to : `${to}?wrong=1`, 'Cache-Control': 'no-store' })
    if (ok) headers.append('Set-Cookie', `${COOKIE}=${want}; Path=/; Max-Age=${MONTH}; HttpOnly; Secure; SameSite=Lax`)
    return new Response(null, { status: 303, headers })
  }

  if (password && cookieValue(req) === want) {
    // A case study address (no file extension) is a page of the single-page app
    if (url.pathname.startsWith('/work/') && !isFile(url.pathname)) return rewrite(new URL('/index.html', url))
    return next({ headers: { 'Cache-Control': 'private, no-store' } })
  }

  if (isFile(url.pathname)) return new Response('Locked', { status: 401, headers: { 'Cache-Control': 'no-store' } })
  return new Response(lockPage(url.pathname, url.searchParams.has('wrong')), {
    status: 401,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  })
}

function lockPage(path: string, wrong: boolean) {
  const nextPath = safePath(path)
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Paula White · Case study</title>
<link rel="icon" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter+Tight:wght@400;500&display=swap">
<style>
  :root { --p: #070822; --on: #2EF5B0; --soft: rgba(46, 245, 176, .62); --line: rgba(46, 245, 176, .28); }
  * { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; background: var(--p); color: var(--on); font-family: 'Inter Tight', 'Helvetica Neue', Arial, sans-serif; }
  .wrap { min-height: 100%; display: flex; flex-direction: column; padding: 28px max(20px, calc((100% - 1240px) / 2)); }
  .top { display: flex; justify-content: space-between; align-items: baseline; }
  .name { font: 400 22px 'DM Serif Display', Georgia, serif; color: var(--on); text-decoration: none; }
  .back { font-size: 14px; color: var(--soft); text-decoration: none; }
  .back:hover { color: var(--on); }
  main { margin: auto 0; padding: 12vh 0; max-width: 620px; }
  .kicker { font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--soft); margin: 0 0 18px; }
  h1 { font: 400 clamp(44px, 7vw, 88px)/1 'DM Serif Display', Georgia, serif; letter-spacing: -0.015em; margin: 0 0 20px; }
  p.lead { font-size: 17px; line-height: 1.55; color: var(--soft); margin: 0 0 40px; max-width: 34em; }
  form { display: flex; gap: 14px; align-items: flex-end; border-bottom: 1px solid var(--line); padding-bottom: 10px; }
  form:focus-within { border-bottom-color: var(--on); }
  label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  input { flex: 1; min-width: 0; background: none; border: 0; outline: 0; color: var(--on); font: 400 22px 'Inter Tight', sans-serif; padding: 6px 0; }
  input::placeholder { color: var(--soft); opacity: .7; }
  button { background: none; border: 0; color: var(--on); font: 500 15px 'Inter Tight', sans-serif; cursor: pointer; padding: 8px 0; white-space: nowrap; }
  button:focus-visible, a:focus-visible { outline: 1px solid var(--on); outline-offset: 4px; }
  .wrong { margin: 14px 0 0; font-size: 14px; color: #FFB4A8; }
</style></head>
<body><div class="wrap">
  <div class="top"><a class="name" href="/">Paula White</a><a class="back" href="/#work">← All work</a></div>
  <main>
    <p class="kicker">Case study</p>
    <h1>This one’s private.</h1>
    <p class="lead">Some of this work is under NDA, so the case studies need a password. Ask me for it and I’ll send it straight over.</p>
    <form method="post" action="/unlock">
      <input type="hidden" name="next" value="${nextPath}">
      <label for="pw">Password</label>
      <input id="pw" name="password" type="password" placeholder="Password" autocomplete="current-password" autofocus required>
      <button type="submit">Unlock →</button>
    </form>
    ${wrong ? '<p class="wrong" role="alert">That’s not it. Try again, or ask me for the password.</p>' : ''}
  </main>
</div></body></html>`
}
