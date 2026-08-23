"use client";

import { useState } from "react";
import { pageContent } from "./content";

function EditablePhoto({ src, alt, placeholder, className = "" }: { src: string; alt: string; placeholder: string; className?: string }) {
  if (src) return <img className={className} src={src} alt={alt} />;
  return <div className={`photo-placeholder ${className}`}><span>{placeholder}</span><b>+</b></div>;
}

export default function Home() {
  const [letterOpen, setLetterOpen] = useState(false);
  const [message, setMessage] = useState<{ title: string; text: string } | null>(null);
  const content = pageContent;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <nav className="nav-pill">
        <button onClick={() => scrollTo("historia")}>{content.navigation.history}</button>
        <button onClick={() => scrollTo("constelaciones")}>{content.navigation.constellations}</button>
        <button onClick={() => scrollTo("recuerdos")}>{content.navigation.memories}</button>
        <button onClick={() => scrollTo("sorpresa")}>{content.navigation.surprise}</button>
      </nav>

      <section className="hero">
        <div className="stars stars-one" />
        <div className="stars stars-two" />
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="hero-copy">
          <span className="eyebrow">{content.hero.eyebrow}</span>
          <h1>{content.hero.title}<br /><em>{content.hero.titleHighlight}</em></h1>
          <p className="hero-lead">{content.hero.description}</p>
          <button className="primary-button" onClick={() => scrollTo("historia")}>
            {content.hero.button} <span>↓</span>
          </button>
        </div>
        <div className="planet planet-main"><span>ANI</span><small>25 vueltas al sol</small></div>
        <div className="planet planet-mini">☕</div>
        <div className="planet planet-animal">♡</div>
        <p className="scroll-hint">{content.hero.scrollHint} <span>✦</span></p>
      </section>

      <section className="intro section-wrap" id="historia">
        <div className="section-kicker">{content.introduction.label}</div>
        <div className="intro-grid">
          <div>
            <h2>{content.introduction.title}<br /><em>{content.introduction.titleHighlight}</em></h2>
            {content.introduction.paragraphs.map((paragraph) => <p className="body-copy" key={paragraph}>{paragraph}</p>)}
          </div>
          <EditablePhoto className="large-photo" {...content.introduction.image} />
        </div>
      </section>

      <section className="timeline-section section-wrap">
        <div className="section-kicker">{content.timeline.label}</div>
        <h2>{content.timeline.title}<br /><em>{content.timeline.titleHighlight}</em></h2>
        <div className="timeline">
          {content.timeline.items.map((item) => <article className="timeline-item" key={item.date}>
            <div className="timeline-marker">{item.icon}</div>
            <div className="timeline-card"><span>{item.date}</span><h3>{item.title}</h3><p>{item.description}</p><EditablePhoto className="mini-photo" {...item.image} /></div>
          </article>)}
        </div>
      </section>

      <section className="constellation-section section-wrap" id="constelaciones">
        <div className="section-kicker">{content.constellations.label}</div>
        <h2>{content.constellations.title}<br /><em>{content.constellations.titleHighlight}</em></h2>
        <p className="section-intro">{content.constellations.instruction}</p>
        <div className="constellation-grid">
          {content.constellations.items.map(([title, text]) => (
  <button
    className="star-card"
    key={title}
    onClick={() => setMessage({ title, text })}
  >
    <span>✦</span>
    <strong>{title}</strong>
  </button>
))}
        </div>
      </section>

      <section className="notes-section section-wrap" id="recuerdos">
        <div className="section-kicker">{content.notes.label}</div>
        <h2>{content.notes.title}<br /><em>{content.notes.titleHighlight}</em></h2>
        <div className="notes-wall">
          {content.notes.items.map((note, index) => <button className={`sticky-note note-${index + 1}`} key={note} onClick={() => setMessage({ title: "Nota encontrada", text: note })}>{note}<span>✦</span></button>)}
        </div>
      </section>

      <section className="gallery-section section-wrap">
        <div className="section-kicker">{content.gallery.label}</div>
        <div className="gallery-heading"><h2>{content.gallery.title}<br /><em>{content.gallery.titleHighlight}</em></h2><p>{content.gallery.description}</p></div>
        <div className="photo-grid">{content.gallery.photos.map((photo, index) => <EditablePhoto className={`photo-${String.fromCharCode(97 + index)}`} key={photo.alt} {...photo} />)}</div>
      </section>

      <section className="letter-section section-wrap">
        <div className="envelope" onClick={() => setLetterOpen(!letterOpen)} role="button" tabIndex={0}>
          <div className={`letter ${letterOpen ? "open" : ""}`}><span>{content.letter.recipient}</span><p>{content.letter.message}</p></div>
          <div className="envelope-front"><span>✉</span><strong>{letterOpen ? content.letter.openTitle : content.letter.closedTitle}</strong><small>{content.letter.instruction}</small></div>
        </div>
      </section>

      <section className="surprise section-wrap" id="sorpresa">
        <div className="section-kicker">{content.surprise.label}</div>
        <h2>{content.surprise.title}<br /><em>{content.surprise.titleHighlight}</em></h2>
        <div className="voucher"><div className="voucher-stamp">{content.surprise.stampName}<br /><small>{content.surprise.stampAge}</small></div><div><span className="voucher-label">{content.surprise.voucherLabel}</span><h3>{content.surprise.voucherTitle}</h3><p>{content.surprise.voucherDescription}</p><button className="primary-button" onClick={() => alert(content.surprise.buttonMessage)}>{content.surprise.button}</button></div></div>
        <p className="qr-copy">{content.surprise.qrText} <strong>{content.surprise.qrHighlight}</strong></p>
      </section>

      <footer><span>{content.footer.left}</span><span>{content.footer.center}</span><span>{content.footer.right}</span></footer>

      {message !== null && <div className="modal-backdrop" onClick={() => setMessage(null)}><div className="note-modal" onClick={(event) => event.stopPropagation()}><button className="close-modal" onClick={() => setMessage(null)}>×</button><span>{content.modal.label}</span><h3>{message.title}</h3><p>{message.text}</p><small>{content.modal.description}</small></div></div>}
    </main>
  );
}
