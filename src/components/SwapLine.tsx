import { useState } from 'react'

/**
 * A headline in three beats that rolls over to a second version on hover (or tap).
 * Each beat sits in its own slot, sized to the longer phrase so nothing jumps,
 * and they roll one after another.
 */
const A = ['Naturally curious.', 'Intentionally simple.', 'Relentlessly hands-on.']
const B = ['So we solve the right problem.', 'Clarity is powerful.', 'Because ideas are only the beginning.']

export default function SwapLine() {
  const [flipped, setFlipped] = useState(false)
  return (
    <p
      className={`display statement-title swap ${flipped ? 'is-flipped' : ''}`}
      onClick={() => setFlipped((f) => !f)}
      aria-label={`${A.join(' ')} ${B.join(' ')}`}
    >
      {A.map((a, i) => (
        <span key={a} className={`swap-slot ${i === 2 ? 'primary' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} aria-hidden="true">
          <span className="swap-a" style={{ transitionDelay: `${i * 90}ms` }}>{a}</span>
          <span className="swap-b" style={{ transitionDelay: `${i * 90}ms` }}>{B[i]}</span>
        </span>
      ))}
    </p>
  )
}
