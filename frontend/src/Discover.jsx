/**
 * Discover.jsx
 *
 * ROUTING INTEGRATION
 * ───────────────────
 * Option A — React Router (recommended):
 *   In your router config add:
 *     { path: "/discover", element: <Discover /> }
 *     { path: "/discover/:section", element: <Discover /> }
 *
 *   Then in School.jsx Navbar, change the "Discover" onNavigate call to:
 *     navigate("/discover")
 *   And sub-link items to:
 *     navigate(`/discover/${encodeURIComponent(s)}`)
 *
 *   Read the param inside this component via:
 *     const { section } = useParams();
 *     initialSection = decodeURIComponent(section) ?? "Overview"
 *
 * Option B — State-based routing (no React Router):
 *   Pass `onNavigate` from App.jsx and intercept "Discover" /
 *   its sub-links to set an `activePage` state to "discover",
 *   then render <Discover initialSection={clickedSubLink} />.
 *
 * Option C — Hash routing:
 *   Map window.location.hash → initialSection on mount.
 */

import { useState, useEffect, useRef } from "react";
import "./Pages.css";

/* ── Data ─────────────────────────────────────────────────── */
const HERITAGE_MILESTONES = [
  {
    year: "1572",
    title: "Founded in England",
    desc: "School was established in the heart of England, beginning a tradition of academic excellence that would span centuries and continents.",
  },
  {
    year: "1891",
    title: "Royal Charter Granted",
    desc: "The Royal Charter cemented School's standing as one of Britain's foremost educational institutions, shaping leaders for generations.",
  },
  {
    year: "1970",
    title: "Global Expansion Begins",
    desc: "School began establishing partner institutions across the globe, carrying its ethos of rigorous learning to new cultures.",
  },
  {
    year: "2024",
    title: "Bengaluru Campus Opens",
    desc: "School Bengaluru opened its doors on a 60-acre campus in Devanahalli — the newest jewel in the Family of Schools.",
  },
];

const FAMILY_SCHOOLS = [
  { city: "London",    country: "United Kingdom", since: "1572", flag: "🇬🇧" },
  { city: "Singapore", country: "Singapore",      since: "1989", flag: "🇸🇬" },
  { city: "Dubai",     country: "UAE",            since: "2003", flag: "🇦🇪" },
  { city: "Hong Kong", country: "China",          since: "2007", flag: "🇭🇰" },
  { city: "Bengaluru", country: "India",          since: "2024", flag: "🇮🇳", active: true },
  { city: "New York",  country: "United States",  since: "2012", flag: "🇺🇸" },
];

const VALUES = [
  {
    icon: "◈",
    title: "Academic Excellence",
    desc: "We set the highest standards in curriculum, teaching, and assessment — preparing students for the world's leading universities.",
  },
  {
    icon: "◉",
    title: "Character Formation",
    desc: "Beyond grades, we shape integrity, resilience, and empathy — qualities that define great human beings.",
  },
  {
    icon: "◎",
    title: "Global Perspective",
    desc: "Our students graduate as citizens of the world, fluent in diverse cultures and confident across borders.",
  },
  {
    icon: "◇",
    title: "Holistic Growth",
    desc: "Sport, arts, service, and leadership complete the education — every student is more than their academic record.",
  },
];

/* ── Hooks ────────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function RevealSection({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Sub-nav ──────────────────────────────────────────────── */
const SUB_LINKS = ["Overview", "School Heritage", "Head of School", "The Journey", "Family of Schools"];

function SubNav({ active, onSelect }) {
  return (
    <div className="discover-subnav">
      <div className="discover-container">
        <div className="discover-subnav__inner">
          {SUB_LINKS.map((l) => (
            <button
              key={l}
              className={`discover-subnav__btn ${active === l ? "discover-subnav__btn--active" : ""}`}
              onClick={() => onSelect(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function DiscoverHero({ activeSection }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (ms) => ({
    opacity:    loaded ? 1 : 0,
    transform:  loaded ? "none" : "translateY(40px)",
    transition: `opacity 0.9s ease ${ms}ms, transform 0.9s ease ${ms}ms`,
  });
                   
  return (
    <section className="discover-hero">
      <div className="discover-hero__grid" />
      <div className="discover-hero__orb discover-hero__orb--a" />
      <div className="discover-hero__orb discover-hero__orb--b" />
      <div className="discover-hero__ring discover-hero__ring--lg" />
      <div className="discover-hero__ring discover-hero__ring--sm" />

      <div className="discover-container discover-hero__content">
        <div style={fade(150)} className="discover-hero__eyebrow">
          <span className="discover-hero__slash">— </span>
          Discover
          <span className="discover-hero__slash"> —</span>
        </div>
        <h1 className="discover-hero__title" style={fade(300)}>
          {activeSection === "Overview"         && <>A School<br /><em>Unlike Any Other</em></>}
          {activeSection === "School Heritage"  && <>453 Years of<br /><em>Living Tradition</em></>}
          {activeSection === "Head of School"   && <>Vision &amp;<br /><em>Leadership</em></>}
          {activeSection === "The Journey"      && <>Your Path<br /><em>Starts Here</em></>}
          {activeSection === "Family of Schools"&& <>A Global<br /><em>Family</em></>}
        </h1>
        <p className="discover-hero__sub" style={fade(500)}>
          School Bengaluru · Est. 2024 · Devanahalli Campus
        </p>
      </div>
    </section>
  );
}

/* ── Overview ─────────────────────────────────────────────── */
function Overview() {
  return (
    <div className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <p className="discover-label">Who We Are</p>
            <h2 className="discover-section-title">Education Forged Over Centuries</h2>
          </div>
        </RevealSection>

        <div className="overview__grid">
          <RevealSection delay={100}>
            <div className="overview__text">
              <p>
                School Bengaluru is part of one of the world's oldest and most distinguished school families.
                For over four centuries, School has shaped curious minds, compassionate leaders, and global citizens.
              </p>
              <p>
                Our Bengaluru campus brings this extraordinary heritage to India — a 60-acre environment of learning,
                sport, arts, and community in the heart of Devanahalli.
              </p>
              <p>
                We offer a rigorous Cambridge and IB curriculum, taught by world-class educators, within a boarding
                and day school community that values every child as a whole person.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={250}>
            <div className="overview__values">
              {VALUES.map((v, i) => (
                <div className="overview__value-item" key={v.title} style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="overview__value-icon">{v.icon}</span>
                  <div>
                    <h4 className="overview__value-title">{v.title}</h4>
                    <p className="overview__value-desc">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>

        <RevealSection delay={150}>
          <div className="overview__pull-quote">
            <div className="overview__pull-quote-bar" />
            <blockquote>
              "The possibilities for learning are endless — they cannot be mandated, quantified, or curtailed."
            </blockquote>
            <p className="overview__pull-quote-attr">— School Founding Philosophy, 1572</p>
          </div>
        </RevealSection>

      </div>
    </div>
  );
}

/* ── Heritage ─────────────────────────────────────────────── */
function Heritage() {
  const [activeYear, setActiveYear] = useState(0);

  return (
    <div className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <p className="discover-label">Our Story</p>
            <h2 className="discover-section-title">453 Years of Excellence</h2>
            <p className="discover-section-intro">
              From Tudor England to modern India — a tradition unbroken, a mission unchanged.
            </p>
          </div>
        </RevealSection>

        <div className="heritage__timeline">
          {/* Vertical line */}
          <div className="heritage__spine" />

          {HERITAGE_MILESTONES.map((m, i) => (
            <RevealSection key={m.year} delay={i * 130}>
              <div
                className={`heritage__node ${activeYear === i ? "heritage__node--active" : ""}`}
                onClick={() => setActiveYear(i)}
              >
                <div className="heritage__dot-wrap">
                  <div className="heritage__dot" />
                </div>
                <div className="heritage__card">
                  <span className="heritage__year">{m.year}</span>
                  <h3 className="heritage__card-title">{m.title}</h3>
                  <p className="heritage__card-desc">{m.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── Head of School ───────────────────────────────────────── */
function HeadOfSchool() {
  return (
    <div className="discover-section">
      <div className="discover-container">

        <div className="hos__grid">
          <RevealSection>
            <div className="hos__photo-col">
              <div className="hos__photo-frame">
                <div className="hos__avatar">CP</div>
                <div className="hos__frame-accent" />
                <div className="hos__frame-corner hos__frame-corner--tl" />
                <div className="hos__frame-corner hos__frame-corner--br" />
              </div>
              <div className="hos__name-plate">
                <p className="hos__name">Dr. Caroline Pascoe</p>
                <p className="hos__role">Head of School, Bengaluru</p>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="hos__text-col">
              <p className="discover-label">Leadership</p>
              <h2 className="discover-section-title" style={{ textAlign: "left" }}>
                A Word from<br />the Head
              </h2>

              {[
                `Welcome to School Bengaluru. We are building something truly exceptional here — a school that honours a 453-year tradition of intellectual rigour while embracing the dynamism and ambition of modern India.`,
                `At School, we believe that education is not simply the acquisition of knowledge, but the formation of character. We are building young people who are curious, compassionate, and capable of shaping the world — leaders who think deeply, act ethically, and care genuinely.`,
                `Our campus in Devanahalli is a place of beauty, possibility, and community. I warmly invite you to visit us, meet our staff and students, and discover what a School education can mean for your family.`,
              ].map((para, i) => (
                <p key={i} className="hos__para">{para}</p>
              ))}

              <div className="hos__signature">
                <div className="hos__sig-line" />
                <p className="hos__sig-name">Dr. Caroline Pascoe</p>
              </div>
            </div>
          </RevealSection>
        </div>

      </div>
    </div>
  );
}

/* ── The Journey ──────────────────────────────────────────── */
const JOURNEY_STEPS = [
  { num: "01", title: "Enquire",         desc: "Reach out to our Admissions team — we'll answer every question and guide you through what to expect." },
  { num: "02", title: "Visit the Campus",desc: "Experience our 60-acre campus first-hand. Meet students, educators, and the community." },
  { num: "03", title: "Apply",           desc: "Complete the application — we assess the whole child: ability, character, and potential." },
  { num: "04", title: "Offer & Enrol",   desc: "Receive your offer and join the School family, beginning a journey that lasts a lifetime." },
];

function TheJourney() {
  return (
    <div className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <p className="discover-label">Admissions</p>
            <h2 className="discover-section-title">Your Journey to School</h2>
            <p className="discover-section-intro">Four steps from enquiry to enrolment — we're with you every step of the way.</p>
          </div>
        </RevealSection>

        <div className="journey__steps">
          {JOURNEY_STEPS.map((step, i) => (
            <RevealSection key={step.num} delay={i * 120}>
              <div className="journey__step">
                <div className="journey__step-num">{step.num}</div>
                <div className="journey__step-connector" />
                <div className="journey__step-body">
                  <h3 className="journey__step-title">{step.title}</h3>
                  <p className="journey__step-desc">{step.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={200}>
          <div className="journey__cta-row">
            <button className="btn-discover-primary">Begin Your Enquiry →</button>
            <button className="btn-discover-outline">Download Prospectus</button>
          </div>
        </RevealSection>

      </div>
    </div>
  );
}

/* ── Family of Schools ────────────────────────────────────── */
function FamilyOfSchools() {
  return (
    <div className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <p className="discover-label">Global Network</p>
            <h2 className="discover-section-title">The School Family</h2>
            <p className="discover-section-intro">
              Six world-class campuses. One shared standard of excellence.
            </p>
          </div>
        </RevealSection>

        <div className="family__grid">
          {FAMILY_SCHOOLS.map((s, i) => (
            <RevealSection key={s.city} delay={i * 90}>
              <div className={`family__card ${s.active ? "family__card--active" : ""}`}>
                {s.active && <div className="family__card-badge">You Are Here</div>}
                <span className="family__flag">{s.flag}</span>
                <h3 className="family__city">{s.city}</h3>
                <p className="family__country">{s.country}</p>
                <p className="family__since">Est. {s.since}</p>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={200}>
          <div className="family__note">
            <div className="family__note-bar" />
            <p>
              Students across the School Family of Schools share exchange programmes, joint competitions,
              and a common alumni network spanning six decades and every major industry.
            </p>
          </div>
        </RevealSection>

      </div>
    </div>
  );
}

/* ── Section Map ──────────────────────────────────────────── */
const SECTION_MAP = {
  "Overview":          <Overview />,
  "School Heritage":   <Heritage />,
  "Head of School":    <HeadOfSchool />,
  "The Journey":       <TheJourney />,
  "Family of Schools": <FamilyOfSchools />,
};

/* ── Page Root ────────────────────────────────────────────── */
export default function Discover({ initialSection = "Overview" }) {
  const [activeSection, setActiveSection] = useState(initialSection);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  return (
    <div className="discover-root">
      <DiscoverHero activeSection={activeSection} />
      <SubNav active={activeSection} onSelect={setActiveSection} />
      <main>{SECTION_MAP[activeSection]}</main>
    </div>
  );
}