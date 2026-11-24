/*
 * SC Training diagrams, drawn editorially: hairlines, brand-coloured frames, quiet labels.
 * 1. Same product, two environments: one Training codebase rendered as standalone EdApp and, via an iframe, inside SafetyCulture.
 * 2. Product onboarding vs platform onboarding, as two lines.
 */

function Frame({ tone, name, meta, children }: { tone: 'edapp' | 'sc'; name: string; meta: string; children?: React.ReactNode }) {
  return (
    <div className={`eco-frame eco-${tone}`}>
      <span className="eco-name">{name}</span>
      {children}
      <span className="eco-meta">{meta}</span>
    </div>
  )
}

export function Ecosystem() {
  return (
    <figure className="eco">
      <div className="eco-col">
        <p className="eco-k">Before</p>
        <div className="eco-pair">
          <Frame tone="edapp" name="EdApp" meta="Own codebase · own design system" />
          <Frame tone="sc" name="SafetyCulture" meta="Own codebase · own design system" />
        </div>
        <p className="eco-cap">Two separate products, each with its own codebase, design system and brand.</p>
      </div>
      <div className="eco-rule" aria-hidden="true" />
      <div className="eco-col">
        <p className="eco-k">After</p>
        <div className="eco-source">
          <span>One Training codebase</span>
          <small>Conditional branding and feature visibility</small>
        </div>
        <svg className="eco-fork" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 0 V20 M25.5 40 V20 H74.5 V40" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="eco-pair">
          <Frame tone="edapp" name="EdApp" meta="Standalone" />
          <Frame tone="sc" name="SafetyCulture" meta="Platform">
            <div className="eco-embed"><span>SC Training</span><small>Embedded via iframe</small></div>
          </Frame>
        </div>
        <p className="eco-cap">The same product, rendered for each customer group.</p>
      </div>
    </figure>
  )
}

function Step({ label, keyStep }: { label: string; keyStep?: boolean }) {
  return (
    <li className={`ob-step ${keyStep ? 'is-key' : ''}`}>
      <i className="ob-dot" />
      <span className="ob-label">{label}</span>
    </li>
  )
}

export function Onboarding() {
  return (
    <figure className="ob">
      <div className="ob-row ob-edapp">
        <div className="ob-head"><b>EdApp</b><span>One product</span></div>
        <ol className="ob-track" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
          <Step label="Sign up for EdApp" />
          <Step label="Onboarding into EdApp" />
          <Step label="Create training" />
          <Step label="Add users" />
        </ol>
      </div>
      <div className="ob-row ob-sc">
        <div className="ob-head"><b>SafetyCulture</b><span>A platform</span></div>
        <div className="ob-split">
          <ol className="ob-track">
            <Step label="Sign up for SafetyCulture" />
            <Step label="Share what they came to do" keyStep />
            <Step label="Guidance adapts" />
          </ol>
          <svg className="ob-branch" viewBox="0 0 64 132" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 66 C 34 66, 30 22, 64 22" vectorEffect="non-scaling-stroke" />
            <path d="M0 66 H 64" vectorEffect="non-scaling-stroke" />
            <path d="M0 66 C 34 66, 30 110, 64 110" vectorEffect="non-scaling-stroke" />
          </svg>
          <ul className="ob-outs">
            <li><i className="ob-dot" />Their main goal comes first</li>
            <li className="is-key"><i className="ob-dot" />Training introduced where relevant</li>
            <li><i className="ob-dot" />Every product still available</li>
          </ul>
        </div>
      </div>
    </figure>
  )
}
