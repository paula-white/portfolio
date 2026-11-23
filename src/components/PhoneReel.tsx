/*
 * One wide panel of app screens, tilted on a diagonal, drifting slowly along it.
 * The screens are exported already framed in a phone, so they're shown as they are.
 * Hover pauses it; with reduced motion it holds still.
 */
export default function PhoneReel({ project, screens }: { project: string; screens: string[] }) {
  const dir = `/work/${project.toLowerCase()}`
  return (
    <section className="cs-visual wrap" aria-label={`${project} app screens`}>
      <div className="preel">
        <div className="preel-track"><div className="preel-inner">
          {[...screens, ...screens].map((alt, i) => (
            <img
              key={i}
              className="preel-device"
              src={`${dir}/screen-${(i % screens.length) + 1}.webp`}
              alt={i < screens.length ? alt : ''}
              aria-hidden={i >= screens.length}
              width="560"
              height="1128"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div></div>
      </div>
    </section>
  )
}
