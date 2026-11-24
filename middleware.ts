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
  // A locked case study page: serve the app, which shows the password screen in the visitor's chosen look.
  return rewrite(new URL('/index.html', url), { headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } })
}
