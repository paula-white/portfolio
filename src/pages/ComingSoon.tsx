import { Link } from 'react-router-dom'
import Placeholders from '../components/Placeholders'

export default function ComingSoon({ title, line }: { title: string; line: string }) {
  return (
    <>
    <section className="soon wrap">
      <p className="mono small">Case study in progress</p>
      <h1 className="display soon-title">{title}</h1>
      <p className="lede">{line}</p>
      <Link to="/#work" className="mono row-cta">← All work</Link>
    </section>
    <Placeholders project={title} />
    </>
  )
}
