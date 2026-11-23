import BrandPanel from './BrandPanel'

export default function Footer() {
  return (
    <BrandPanel as="footer" id="contact" seed={4}>
    <div className="footer">
      <p className="display footer-title">Reach <span className="accent">out.</span></p>
      <div className="footer-row mono">
        <span>
          <a href="mailto:paula-white@hotmail.com">[Email]</a> · <a href="https://www.linkedin.com/in/paula-white" target="_blank" rel="noreferrer">[LinkedIn]</a> · <a href="/paula-white-resume.pdf">[Résumé]</a>
        </span>
        <span>PW {new Date().getFullYear()}©</span>
      </div>
      <p className="ack">I acknowledge the Traditional Custodians of the land where I live and work, and pay my respects to Elders past and present.</p>
    </div>
    </BrandPanel>
  )
}
