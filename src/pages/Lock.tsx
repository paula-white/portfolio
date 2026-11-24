import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BrandPanel from '../components/BrandPanel'

/*
 * Case-study password screen, in the visitor's chosen look (palette, typeface, background).
 * The server keeps the case-study code and images locked; this page only asks for the password.
 */
export default function Lock() {
  const { pathname, search } = useLocation()
  const wrong = new URLSearchParams(search).has('wrong')
  useEffect(() => {
    document.documentElement.dataset.locked = '1'
    return () => { delete document.documentElement.dataset.locked }
  }, [])
  return (
    <BrandPanel className="pw-lock" seed={6}>
      <div className="lock-inner">
        <p className="lock-kicker">Case study</p>
        <h1 className="display lock-title">A small barrier to entry.</h1>
        <p className="lock-lead">Not my usual approach to UX, but confidentiality calls. Get in touch for the password.</p>
        <form className="lock-form" method="post" action="/unlock">
          <input type="hidden" name="next" value={pathname} />
          <label htmlFor="pw" className="lock-sr">Password</label>
          <input id="pw" name="password" type="password" placeholder="Password" autoComplete="current-password" autoFocus required />
          <button type="submit">Unlock →</button>
        </form>
        {wrong && <p className="lock-wrong" role="alert">That’s not it. Try again, or ask me for the password.</p>}
      </div>
    </BrandPanel>
  )
}
