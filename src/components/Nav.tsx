import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function sydneyTime() {
  try {
    return new Date().toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', timeZone: 'Australia/Sydney' }).toLowerCase()
  } catch {
    return ''
  }
}

export default function Nav() {
  const [time, setTime] = useState(sydneyTime)
  useEffect(() => {
    const t = setInterval(() => setTime(sydneyTime()), 20000)
    return () => clearInterval(t)
  }, [])
  return (
    <nav className="nav">
      <Link to="/" className="nav-name display">Paula White</Link>
      <div className="nav-links">
        <Link to="/#work">Work ©</Link>
        <Link to="/#bio">About</Link>
        <a href="/paula-white-resume.pdf">Résumé</a>
        <Link to="/#contact">Let’s chat</Link>
      </div>
      <span className="clock" aria-label={`Sydney time ${time}`}><span className="clock-dot" /> Sydney, {time}</span>
    </nav>
  )
}
