/*
 * SC Training diagrams, drawn editorially: hairlines, brand-coloured frames, quiet labels.
 * 1. Same product, two environments: one Training codebase rendered as standalone EdApp and, via an iframe, inside SafetyCulture.
 * 2. Product onboarding vs platform onboarding, as two lines.
 */

type Tone = 'edapp' | 'sc'

/* A small, abstract product window. */
function Window({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <div className={`win win-${tone}`}>
      <div className="win-bar"><i /><i /><i /></div>
      <div className="win-body">{children}</div>
    </div>
  )
}

/* The Training product's interface: a header and a row of course tiles, in whichever brand it's rendered for. */
function TrainingUI({ tone }: { tone: Tone }) {
  return (
    <div className={`tui tui-${tone}`}>
      <div className="tui-head"><i className="tui-title" /><i className="tui-btn" /></div>
      <div className="tui-cards">
        {[0, 1, 2].map((k) => (
          <div key={k} className="tui-card"><i className="tui-img" /><i className="tui-l" /><i className="tui-l tui-s" /></div>
        ))}
      </div>
    </div>
  )
}

function EdAppApp() {
  return (
    <Window tone="edapp">
      <div className="app">
        <div className="app-side app-side-edapp"><i className="app-logo" /><i /><i /><i /></div>
        <div className="app-main"><TrainingUI tone="edapp" /></div>
      </div>
    </Window>
  )
}

function ScPlatform({ embed }: { embed?: boolean }) {
  return (
    <Window tone="sc">
      <div className="app">
        <div className="app-side app-side-sc"><i className="app-logo" /><i className={embed ? '' : 'on'} /><i /><i className={embed ? 'on' : ''} /><i /></div>
        <div className="app-main">
          {embed ? (
            <div className="embed"><span className="embed-tag">iframe</span><TrainingUI tone="sc" /></div>
          ) : (
            <div className="list">
              <div className="tui-head"><i className="tui-title" /><i className="tui-btn" /></div>
              {[0, 1, 2, 3].map((k) => <div key={k} className="list-row"><i /><i /><b /></div>)}
            </div>
          )}
        </div>
      </div>
    </Window>
  )
}

function Labelled({ name, meta, tone, children }: { name: string; meta: string; tone: Tone; children: React.ReactNode }) {
  return (
    <div className="eco2-item">
      {children}
      <p className={`eco2-name eco2-${tone}`}><b>{name}</b><span>{meta}</span></p>
    </div>
  )
}

export function Ecosystem() {
  return (
    <figure className="eco2">
      <div className="eco2-row">
        <p className="eco2-k">Before</p>
        <div className="eco2-content">
          <div className="eco2-pair">
            <Labelled name="EdApp" meta="Own codebase · own design system" tone="edapp"><EdAppApp /></Labelled>
            <Labelled name="SafetyCulture" meta="Own codebase · own design system" tone="sc"><ScPlatform /></Labelled>
          </div>
          <p className="eco2-note">Two separate products, each with its own codebase, design system and brand.</p>
        </div>
      </div>
      <div className="eco2-row">
        <p className="eco2-k">After</p>
        <div className="eco2-content">
          <div className="eco2-src"><b>One Training codebase</b><span>Conditional branding and feature visibility</span></div>
          <svg className="eco2-fork" viewBox="0 0 1000 56" preserveAspectRatio="none" aria-hidden="true">
            <path d="M500 0 V18 Q500 28 490 28 H260 Q250 28 250 38 V56" vectorEffect="non-scaling-stroke" />
            <path d="M500 18 Q500 28 510 28 H740 Q750 28 750 38 V56" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="eco2-pair">
            <Labelled name="EdApp" meta="Standalone" tone="edapp"><EdAppApp /></Labelled>
            <Labelled name="SafetyCulture" meta="SC Training, embedded via iframe" tone="sc"><ScPlatform embed /></Labelled>
          </div>
          <p className="eco2-note">The same product, rendered for each customer group.</p>
        </div>
      </div>
    </figure>
  )
}

function Step({ label, keyStep, cls = '' }: { label: string; keyStep?: boolean; cls?: string }) {
  return (
    <li className={`ob-step ${keyStep ? 'is-key' : ''} ${cls}`}>
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
        <ol className="ob-track" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
          <Step label="Sign up for EdApp" />
          <Step label="Onboarding into EdApp" />
          <Step label="Create training" keyStep />
          <Step label="Add users" keyStep cls="is-dash-after" />
          <Step label="And more set-up" cls="is-more" />
          <li className="ob-bracket" aria-hidden="true"><span>Core set-up</span></li>
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
