import { useState } from 'react'

/*
 * Ten years, in short: five words on one line. Hover (or tap) one to read its story;
 * the others step back. Nothing else to read until someone is curious.
 */
const FACTS = [
  ['Acquired', 'EdApp', 'Helped take EdApp through to acquisition, across brand, website, product and investor decks.'],
  ['200K+', 'EdApp', 'People a month used the mobile app I designed as its sole designer.'],
  ['2 → 1', 'SC Training', 'Brought EdApp into the SafetyCulture platform as one product, with 6+ teams.'],
  ['Repriced', 'Deputy', 'Designed how customers buy through Deputy’s company-wide pricing change.'],
  ['End to end', 'All three', 'From sign-up and onboarding to features and billing.'],
]

export default function CareerLine() {
  const [on, setOn] = useState<number | null>(null)
  return (
    <div className={`career ${on !== null ? 'has-on' : ''}`} onMouseLeave={() => setOn(null)}>
      <ol className="career-words">
        {FACTS.map(([word, where], i) => (
          <li key={word}>
            <button
              className={`career-word ${on === i ? 'is-on' : ''}`}
              onMouseEnter={() => setOn(i)}
              onFocus={() => setOn(i)}
              onClick={() => setOn(on === i ? null : i)}
              aria-expanded={on === i}
            >
              <span className="display">{word}</span>
              <sup className="career-where">{where}</sup>
            </button>
          </li>
        ))}
      </ol>
      <p className="career-story" aria-live="polite">
        {on === null ? <span className="career-hint">Hover a word for the story</span> : FACTS[on][2]}
      </p>
    </div>
  )
}
