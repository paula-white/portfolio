import { useEffect, useRef, useState } from 'react'

/** Returns the previous value for `ms` after it changes, so the old and new can cross-fade. */
export function useCrossfade<T>(value: T, ms = 800): T | null {
  const [prev, setPrev] = useState<T | null>(null)
  const last = useRef(value)
  useEffect(() => {
    if (last.current === value) return
    setPrev(last.current)
    last.current = value
    const t = window.setTimeout(() => setPrev(null), ms)
    return () => window.clearTimeout(t)
  }, [value, ms])
  return prev
}
