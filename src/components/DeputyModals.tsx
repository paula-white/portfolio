import type { ReactNode } from 'react'

/*
 * Rebuilt Deputy plan modals (upgrade and welcome), from Paula's own designs.
 * Left: the copy and actions. Right: the plan's illustration, rebuilt in code
 * for Pro, Core and Lite, and the original high-res artwork for the add-ons.
 */

function Icon() {
  return (
    <span className="dm-ico" aria-hidden="true">
      <svg viewBox="0 0 16 16"><path d="M4 8.5l2.5 2.5L12 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  )
}

function Shell({ title, sub, label, children, art, actions = 'welcome' }: { title: string; sub?: string; label: string; children: ReactNode; art: ReactNode; actions?: 'welcome' | 'upgrade' }) {
  return (
    <div className="dm">
      <div className="dm-left">
        <b className="dm-title">{title}</b>
        {sub && <p className="dm-sub">{sub}</p>}
        <p className="dm-label">{label}</p>
        {children}
        <div className={`dm-actions dm-actions-${actions}`}>
          {actions === 'welcome' ? (
            <>
              <span className="dm-btn dm-btn-ghost">View subscriptions</span>
              <span className="dm-btn">Get started</span>
            </>
          ) : (
            <span className="dm-btn">Continue</span>
          )}
        </div>
      </div>
      <div className="dm-right">
        <span className="dm-close" aria-hidden="true">×</span>
        {art}
      </div>
    </div>
  )
}

function Features({ items, more = true }: { items: string[]; more?: boolean }) {
  return (
    <>
      <ul className="dm-features">
        {items.map((t) => <li key={t}><Icon />{t}</li>)}
      </ul>
      {more && <p className="dm-more">And many more features</p>}
    </>
  )
}

function Advantages({ items }: { items: [string, string][] }) {
  return (
    <ul className="dm-adv">
      {items.map(([t, d]) => (
        <li key={t}><Icon /><span><b>{t}</b>{d}</span></li>
      ))}
    </ul>
  )
}

/* Right-hand art, rebuilt */

function ProArt() {
  return (
    <div className="dm-art dm-art-pro">
      <div className="tree">
        <div className="tree-row"><span className="node node-hq">Head office</span></div>
        <div className="tree-row"><span className="node">Australia<small>4 pay centres</small></span><span className="node faded">New Zealand<small>2 pay centres</small></span></div>
        <div className="tree-row"><span className="node faded">Queensland</span><span className="node">Victoria</span><span className="node faded">New South Wales</span></div>
        <div className="tree-row"><span className="node">Richmond</span><span className="node faded">Brunswick East</span></div>
        <div className="tree-row"><span className="node faded">Bar</span><span className="node">Front of house</span><span className="node">Deliveries</span></div>
      </div>
    </div>
  )
}

function CoreArt() {
  return (
    <div className="dm-art dm-art-core">
      <div className="core-card">
        <div className="core-head"><b>Labor model</b><span className="core-add">+ Add</span></div>
        <p>For every <span className="pill">5 in sales</span> add</p>
        <p><span className="pill">1 main floor employee</span></p>
        <p>Min <span className="pill">3 main floor employees</span></p>
        <p>Max <span className="pill">6 main floor employees</span></p>
      </div>
      <div className="core-card core-sales">
        <div className="core-head"><b>Sales</b><span className="core-nav">‹ 7 – 13 Oct ›</span></div>
        <div className="core-row"><span>9am</span><i /></div>
        <div className="core-row"><span>10am</span><span>$8,901.54</span><b className="up">+$835.01 (12%)</b></div>
        <div className="core-row"><span>11am</span><i /></div>
        <div className="core-row"><span>12pm</span><i /></div>
      </div>
    </div>
  )
}

function LiteArt() {
  const shifts = [
    ['2:30pm – 8:30pm', 'Front of house', 'g', '18%', '10%'],
    ['12:30pm – 4:30pm', 'Housekeeping', 'b', '30%', '-6%'],
    ['2:30pm – 6:30pm', 'Deliveries', 'c', '46%', '14%'],
    ['4:30pm – 11:30pm', 'Kitchen hand', 'p', '60%', '34%'],
    ['1:30pm – 7:30pm', 'Reception', 'o', '76%', '8%'],
  ]
  return (
    <div className="dm-art dm-art-lite">
      {shifts.map(([time, role, c, top, left]) => (
        <div key={role} className={`shift shift-${c}`} style={{ top, left }}>
          <b>{time}</b><span>{role}</span>
        </div>
      ))}
    </div>
  )
}

function ImgArt({ name, alt }: { name: string; alt: string }) {
  return <div className="dm-art dm-art-img"><img src={`/work/deputy/${name}.jpg`} alt={alt} loading="lazy" decoding="async" /></div>
}

export const MODALS = {
  upgradePro: (
    <Shell title="Upgrade to Pro" sub="Access comprehensive tools with powerful automation and advanced insights, built to support complex workforce needs." label="Unlock these advantages:" actions="upgrade" art={<ProArt />}>
      <Advantages items={[
        ['More customisability', 'with features like location hierarchies, custom pay centres, and custom timesheet and schedule fields'],
        ['Deeper insights', 'with access to our full Analytics+ reporting suite'],
        ['Stronger collaboration', 'using Messaging+ which includes read receipts, custom group creation, moderation tools, polls and more'],
      ]} />
    </Shell>
  ),
  upgradeCore: (
    <Shell title="Upgrade to Core" sub="Unlock smarter automation, seamless scalability and more control with our Core plan." label="Get excited about:" actions="upgrade" art={<CoreArt />}>
      <Advantages items={[
        ['Greater efficiency', 'with features like auto-scheduling, labor modelling and auto-timesheet approvals'],
        ['Actionable insights', 'with access to the business insights dashboard, shift pulse reporting, and budget and target setting'],
        ['More customisability', 'with features like our pay rate builder, custom metric setting, and custom shift fields'],
      ]} />
    </Shell>
  ),
  welcomePro: (
    <Shell title="Welcome to Pro" sub="Comprehensive tools with powerful automation and advanced insights, built to support complex workforce needs." label="Get excited about:" art={<ProArt />}>
      <Features items={['Location Hierarchies', 'Advanced Timesheets', 'Custom Pay Centres', 'Custom Access Levels']} />
    </Shell>
  ),
  welcomeCore: (
    <Shell title="Welcome to Core" sub="Smarter automation, seamless scalability and more control." label="Get excited about:" art={<CoreArt />}>
      <Features items={['Timesheet Auto Approval', 'Customisable Pay Rates', 'Business Insights', 'Multi-location Scheduling']} />
    </Shell>
  ),
  welcomeLite: (
    <Shell title="Welcome to Lite" sub="All the essentials for scheduling and time tracking." label="Get excited about:" art={<LiteArt />}>
      <Features items={['Rostering', 'Timesheets', 'Reporting', 'Labour Law compliance']} />
    </Shell>
  ),
  welcomeHr: (
    <Shell title="Welcome to HR" label="Get excited about:" art={<ImgArt name="hr" alt="HR illustration: documents, signatures, kudos and a shift check-in" />}>
      <Features items={['Hire', 'HR Onboarding', 'Document Management', 'Employee Engagement', 'HR Reports']} />
    </Shell>
  ),
  welcomePayroll: (
    <Shell title="Welcome to Payroll" label="Get excited about:" art={<ImgArt name="payroll" alt="Payroll illustration: payday notification, timesheets and pay calendars" />}>
      <Features items={['Simplified Payroll Processing', 'Employee Payslips', 'Payroll Reporting', 'BEAM Super Clearing House', 'Multi-ABN support']} />
    </Shell>
  ),
  welcomeMessaging: (
    <Shell title="Welcome to Messaging+" label="Get excited about:" art={<ImgArt name="messaging" alt="Messaging+ illustration: team chat, read receipts and pinned messages" />}>
      <Features items={['Smart location-based groups', 'Read Receipts and Polls', 'Access-level based permissions', 'Unlimited group size limit']} />
    </Shell>
  ),
  welcomeAnalytics: (
    <Shell title="Welcome to Analytics+" label="Get excited about:" art={<ImgArt name="analytics" alt="Analytics+ illustration: reports, schedule exports and on-time insights" />}>
      <Features items={['Library of 15+ reports you can personalise for your business', 'Create and share custom reports', 'Regular scheduled report sends to your team', 'Alerts on changes to your key business metrics']} />
    </Shell>
  ),
}

export type ModalKey = keyof typeof MODALS
