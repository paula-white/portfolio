import type { ReactNode } from 'react'
import { useTheme } from '../theme'
import Lava from './Lava'
import Camo from './Camo'
import DotType from './DotType'

/** A section that wears the visitor's chosen background. Used on every second panel. */
export default function BrandPanel({ children, className = '', id, as: Tag = 'section', seed = 1 }: { children: ReactNode; className?: string; id?: string; as?: 'section' | 'footer'; seed?: number }) {
  const { look, palette } = useTheme()
  return (
    <Tag id={id} className={`brand-panel bp-${look.bg} ${className}`}>
      {look.bg === 'lava' && <Lava base={palette.p} accent={palette.a} seed={seed} />}
      {look.bg === 'camo' && <Camo bg={palette.bg} ink={palette.ink} />}
      {look.bg === 'dots' && <DotType field dot={palette.a} grid={palette.onP} />}
      <div className="bp-content">{children}</div>
    </Tag>
  )
}
