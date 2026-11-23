import type { ReactNode } from 'react'
import { useTheme } from '../theme'
import Marquee from './Marquee'
import Camo from './Camo'
import DotType from './DotType'

/** A section that wears the visitor's chosen background. Used on every second panel. */
export default function BrandPanel({ children, className = '', id, as: Tag = 'section', seed = 1 }: { children: ReactNode; className?: string; id?: string; as?: 'section' | 'footer'; seed?: number }) {
  const { look, palette, type } = useTheme()
  return (
    <Tag id={id} className={`brand-panel bp-${look.bg} ${className}`}>
      {look.bg === 'marquee' && <Marquee family={type.display} weight={type.wt} fontStyle={type.st} base={palette.p} ink={palette.a} seed={seed} quiet />}
      {look.bg === 'camo' && <Camo base={palette.p} accent={palette.a} text={palette.onP} />}
      {look.bg === 'dots' && <DotType field dot={palette.a} grid={palette.onP} />}
      <div className="bp-content">{children}</div>
    </Tag>
  )
}
