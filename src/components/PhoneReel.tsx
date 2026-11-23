/*
 * One wide panel of phones drifting slowly sideways. Each phone shows a screen image
 * from /work/<project>/screen-N.png once it exists; until then, a blank placeholder.
 * Hover pauses it; with reduced motion it holds still and scrolls by hand.
 */
export default function PhoneReel({ project, screens = 6 }: { project: string; screens?: number }) {
  const list = Array.from({ length: screens }, (_, i) => i + 1)
  return (
    <section className="cs-visual wrap" aria-label={`${project} app screens`}>
      <div className="preel">
        <div className="preel-track">
          {[...list, ...list].map((n, i) => (
            <div key={i} className="preel-phone" aria-hidden={i >= list.length}>
              <div className="preel-screen">
                <img
                  src={`/work/${project.toLowerCase()}/screen-${n}.png`}
                  alt=""
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                <span className="preel-ph">Screen {n}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
