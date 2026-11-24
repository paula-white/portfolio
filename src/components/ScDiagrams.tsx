/*
 * SC Training diagrams.
 * 1. Same product, two environments: one Training codebase rendered as standalone EdApp and, via an iframe, inside SafetyCulture.
 * 2. Product onboarding vs platform onboarding.
 */

function Browser({ tone, title, children }: { tone: 'edapp' | 'sc'; title: string; children?: React.ReactNode }) {
  return (
    <div className={`scd-browser scd-${tone}`}>
      <div className="scd-bar"><i /><i /><i /><span>{title}</span></div>
      <div className="scd-body">{children}</div>
    </div>
  )
}

const Lines = () => <div className="scd-lines"><i /><i /><i style={{ width: '60%' }} /></div>

export function Ecosystem() {
  return (
    <figure className="scd">
      <div className="scd-cols">
        <div className="scd-col">
          <p className="scd-k">Before</p>
          <div className="scd-before">
            <Browser tone="edapp" title="EdApp"><Lines /></Browser>
            <Browser tone="sc" title="SafetyCulture"><Lines /></Browser>
          </div>
          <p className="scd-cap">Two separate products, each with its own codebase, design system and brand.</p>
        </div>
        <div className="scd-col scd-after">
          <p className="scd-k">After</p>
          <div className="scd-source">One Training codebase<span>Conditional branding and feature visibility</span></div>
          <div className="scd-forks" aria-hidden="true"><i /><i /></div>
          <div className="scd-before">
            <Browser tone="edapp" title="EdApp · standalone"><Lines /></Browser>
            <Browser tone="sc" title="SafetyCulture">
              <div className="scd-nav"><i /><i /><i /><i /></div>
              <div className="scd-iframe"><span>SC Training</span><small>embedded via iframe</small></div>
            </Browser>
          </div>
          <p className="scd-cap">The same product, rendered for each customer group.</p>
        </div>
      </div>
    </figure>
  )
}

export function Onboarding() {
  return (
    <figure className="scd scd-onb">
      <div className="scd-row">
        <p className="scd-k">EdApp · one product</p>
        <ol className="scd-line">
          <li>Sign up for EdApp</li>
          <li>Training onboarding</li>
          <li>Start training</li>
        </ol>
      </div>
      <div className="scd-row">
        <p className="scd-k">SafetyCulture · a platform</p>
        <div className="scd-branch">
          <ol className="scd-line">
            <li>Sign up for SafetyCulture</li>
            <li className="is-key">Share what they came to do</li>
            <li>Guidance adapts</li>
          </ol>
          <ul className="scd-outs">
            <li>Their main goal comes first</li>
            <li className="is-key">Training introduced where relevant</li>
            <li>Every product still available</li>
          </ul>
        </div>
      </div>
    </figure>
  )
}
