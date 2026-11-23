/** Three blank squares, holding the space until the real project images arrive. */
export default function Placeholders({ project }: { project: string }) {
  return (
    <section className="cs-visual wrap" aria-label={`${project} images coming soon`}>
      <div className="ph3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="ph3-sq">
            <span className="mono small">{project} · Image {n}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
