import type { ReactNode } from 'react'
import { useTheme } from '../theme'
import Marquee from './Marquee'
import Camo from './Camo'
import DotType from './DotType'

/** A section that wears the visitor's chosen background. Used on every second panel. */
export default function BrandPanel({ children, className = '', id, as: Tag = 'section', seed = 1, solid = false }: { children: ReactNode; className?: string; id?: string; as?: 'section' | 'footer'; seed?: number; solid?: boolean }) {
  const { look, palette, type } = useTheme()
  // Solid panels wear the colour without the moving background, for a calm beat between busy ones.
  const bg = solid ? 'plain' : look.bg
  const renderBg = (k: string) =>
    k === 'marquee' ? <Marquee family={type.display} weight={type.wt} fontStyle={type.st} base={palette.p} ink={palette.a} seed={seed} quiet />
    : k === 'camo' ? <Camo base={palette.p} accent={palette.a} text={palette.onP} />
    : k === 'dots' ? <DotType field dot={palette.a} grid={palette.onP} />
    : null
  return (
    <Tag id={id} className={`brand-panel bp-${bg} ${className}`}>
      <div key={bg} className="bg-layer" aria-hidden="true">{renderBg(bg)}</div>
      <div className="bp-content">{children}</div>
    </Tag>
  )
}
