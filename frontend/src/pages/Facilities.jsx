import { useState, useEffect, useRef } from "react";
import "./Pages.css";

/* ── Data ─────────────────────────────────────────────────── */
const FACILITY_HIGHLIGHTS = [
  {
    icon: "◎",
    title: "World-Class Learning Spaces",
    desc: "Purpose-built classrooms and laboratories designed to inspire curiosity and deep academic engagement.",
  },
  {
    icon: "◈",
    title: "Arts & Performance Venues",
    desc: "A professional theatre, music studios, and art rooms that nurture every form of creative expression.",
  },
  {
    icon: "◉",
    title: "Sports & Wellness Facilities",
    desc: "Olympic-standard sports infrastructure supporting fitness, competition, and lifelong wellbeing.",
  },
  {
    icon: "◇",
    title: "Technology & Innovation",
    desc: "Cutting-edge STEM labs, maker spaces, and digital learning environments built for the future.",
  },
];

const ACADEMIC_SPACES = [
  {
    name: "Science Laboratories",
    desc: "Fully equipped physics, chemistry, and biology labs where students explore and experiment at the highest level.",
    icon: "",
  },
  {
    name: "Library & Research Centre",
    desc: "A vast collection of physical and digital resources supporting independent learning and academic depth.",
    icon: "",
  },
  {
    name: "Innovation & Maker Space",
    desc: "Robotics, 3D printing, and design thinking studios that bring creativity and engineering together.",
    icon: "",
  },
  {
    name: "Digital Learning Hub",
    desc: "High-speed connectivity and device-rich environments ensure every student is ready for a digital world.",
    icon: "",
  },
];

const SPORTS_FACILITIES = [
  {
    name: "Aquatic Centre",
    detail: "Olympic-standard 50-metre pool with coaching lanes for competitive and recreational swimming.",
  },
  {
    name: "Multi-Sport Arena",
    detail: "Indoor courts for basketball, badminton, volleyball, and a range of team sports.",
  },
  {
    name: "Football Pitches",
    detail: "Full-size natural and synthetic grass pitches used for training and inter-school competition.",
  },
  {
    name: "Athletics Track",
    detail: "Eight-lane all-weather track supporting sprints, field events, and endurance programmes.",
  },
  {
    name: "Tennis Courts",
    detail: "Floodlit courts with professional-grade surfaces for year-round play and coaching.",
  },
  {
    name: "Fitness & Wellness Centre",
    detail: "A modern gym, yoga studio, and wellbeing suite available to students across all year groups.",
  },
];

const ARTS_SPACES = [
  {
    term: "The School Theatre",
    dates: "600-seat capacity",
    note: "A professional performance venue hosting drama productions, concerts.",
  },
  {
    term: "Music Studios",
    dates: "12 practice rooms",
    note: "Individual and ensemble spaces equipped for classical, contemporary, and recording work.",
  },
  {
    term: "Visual Arts Studios",
    dates: "Dedicated galleries",
    note: "Spacious studios for painting, sculpture, ceramics, photography, and digital art.",
  },
];

/* ── Hooks ────────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
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
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Sub-nav ──────────────────────────────────────────────── */
// Uses: .discover-subnav, .discover-subnav__inner,
//       .discover-subnav__btn, .discover-subnav__btn--active
const SUB_LINKS = [
  "Overview",
  // "Academic Spaces",
  "Sports Facilities",
  "Arts & Performance",
];

function SubNav({ active, onSelect }) {
  return (
    <div className="discover-subnav">
      <div className="discover-subnav__inner">
        {SUB_LINKS.map((l) => (
          <button
            key={l}
            className={`discover-subnav__btn ${
              active === l ? "discover-subnav__btn--active" : ""
            }`}
            onClick={() => onSelect(l)}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
// Uses: .discover-hero, .discover-hero__grid, .discover-hero__orb--a/b,
//       .discover-hero__ring--lg/sm, .discover-container,
//       .discover-hero__content, .discover-hero__eyebrow,
//       .discover-hero__slash, .discover-hero__title, .discover-hero__sub
function FacilitiesHero({ activeSection }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (ms) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "none" : "translateY(40px)",
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
          Facilities
          <span className="discover-hero__slash"> —</span>
        </div>

        <h1 className="discover-hero__title" style={fade(300)}>
          {activeSection === "Overview" && (
            <>Spaces Built for<br /><em>Exceptional Learning</em></>
          )}
          {activeSection === "Academic Spaces" && (
            <>Where Curiosity<br /><em>Meets Discovery</em></>
          )}
          {activeSection === "Sports Facilities" && (
            <>World-Class<br /><em>Sport & Wellness</em></>
          )}
          {activeSection === "Arts & Performance" && (
            <>Stages for<br /><em>Creative Excellence</em></>
          )}
        </h1>

        <p className="discover-hero__sub" style={fade(500)}>
          Learning · Sport · Arts · Innovation
        </p>
      </div>
    </section>
  );
}

/* ── Overview ─────────────────────────────────────────────── */
// Uses: .discover-section, .discover-container, .discover-section-header,
//       .discover-section-title, .discover-section-intro,
//       .overview__grid, .overview__text, .overview__values,
//       .overview__value-item, .overview__value-icon,
//       .overview__value-title, .overview__value-desc
function Overview() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              Our Chandigarh Campus
            </h2>
            <p className="discover-section-intro">Facilities</p>
          </div>
        </RevealSection>

        <div className="overview__grid">
          <RevealSection delay={120}>
            <div className="overview__text">
              <p>
                Our Chandigarh campus at Duke Infosys, Sector 45 has been thoughtfully designed to provide every
                student with the very best environment for learning, creativity,
                sport, and personal growth.
              </p>
              <p>
                From state-of-the-art science laboratories to professional
                performance theatres, every space reflects our commitment to
                excellence and the holistic development of every student.
              </p>
              <p>
                Facilities are maintained to the highest international standards
                — ensuring students are inspired, supported, and challenged at
                every stage of their school journey.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={250}>
            <div className="overview__values">
              {FACILITY_HIGHLIGHTS.map((v, i) => (
                <div
                  className="overview__value-item"
                  key={v.title}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
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

      </div>
    </section>
  );
}

/* ── Academic Spaces ──────────────────────────────────────── */
// Uses: .discover-section, .discover-container, .discover-section-header,
//       .discover-section-title, .discover-section-intro
// Cards: 2-col inline grid + .overview__value-item with emoji + column layout
function AcademicSpaces() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              Academic & Learning Spaces
            </h2>
            <p className="discover-section-intro">Academic Spaces</p>
          </div>
        </RevealSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {ACADEMIC_SPACES.map((a, i) => (
            <RevealSection key={a.name} delay={i * 120}>
              <div
                className="overview__value-item"
                style={{ flexDirection: "column", gap: "12px" }}
              >
                <span style={{ fontSize: "28px" }}>{a.icon}</span>
                <div>
                  <h4 className="overview__value-title">{a.name}</h4>
                  <p className="overview__value-desc">{a.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* <RevealSection>
          <div className="heritageHidden">
            <p></p>
          </div>
        </RevealSection> */}

      </div>
    </section>
  );
}

/* ── Sports Facilities ────────────────────────────────────── */
// Uses: .discover-section, .discover-container, .discover-section-header,
//       .discover-section-title, .discover-section-intro
// Cards: 2-col inline grid + .heritage__card + .heritage__card-title /
//        .heritage__card-desc
function SportsFacilities() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              Sports & Wellness Facilities
            </h2>
            <p className="discover-section-intro">Sports Facilities</p>
          </div>
        </RevealSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {SPORTS_FACILITIES.map((s, i) => (
            <RevealSection key={s.name} delay={i * 100}>
              <div className="heritage__card">
                <h3 className="heritage__card-title">{s.name}</h3>
                <p className="heritage__card-desc">{s.detail}</p>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection>
            <div className="heritageHiddenB"  >
              <p>
                August – December
Autumn Term
Term begins with orientation and academic induction.

January – March
Spring Term
Focused academic learning with co-curricular showcases.

April – June
Summer Term
Final assessments, celebrations, and enrichment programmes.
              </p>
            </div>
          </RevealSection>

      </div>
    </section>
  );
}

/* ── Arts & Performance ───────────────────────────────────── */
// Uses: .discover-section, .discover-container, .discover-section-header,
//       .discover-section-title, .discover-section-intro
// Cards: 3-col inline grid + .heritage__card + .heritage__year for capacity /
//        .heritage__card-title / .heritage__card-desc
// Pull quote at bottom: .overview__pull-quote + .overview__pull-quote-bar
function ArtsPerformance() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              Arts & Performance Spaces
            </h2>
            <p className="discover-section-intro">Arts & Performance</p>
          </div>
        </RevealSection>  

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {ARTS_SPACES.map((a, i) => (
            <RevealSection key={a.term} delay={i * 120}>
              <div className="heritage__card">
                <span
                  className="heritage__year"
                  style={{ fontSize: "18px", marginBottom: "6px" }}
                >
                  {a.dates}
                </span>
                <h3 className="heritage__card-title">{a.term}</h3>
                <p className="heritage__card-desc">{a.note}</p>
              </div>
            </RevealSection>
          ))}
        </div>
        <RevealSection>
            <div className="heritageHiddenB"  >
              <p>
                August – December
Autumn Term
Term begins with orientation and academic induction.

January – March
Spring Term
Focused academic learning with co-curricular showcases.

April – June
Summer Term
Final assessments, celebrations, and enrichment programmes.
              </p>
            </div>
          </RevealSection>

          <br />         

        <RevealSection delay={200}>
          <div className="overview__pull-quote">
            <div className="overview__pull-quote-bar" />
            <div>
              <blockquote>
                "Our arts spaces exist to give every student a stage — wherever
                their passion lies."
              </blockquote>
              <p className="overview__pull-quote-attr">
                Head of Arts & Creative Programmes
              </p>
            </div>
          </div>
        </RevealSection>

      </div>    
    </section>
  );
}

/* ── Section Map ──────────────────────────────────────────── */
const SECTION_MAP = {
  Overview: <Overview />,
  // "Academic Spaces": <AcademicSpaces />,
  "Sports Facilities": <SportsFacilities />,
  "Arts & Performance": <ArtsPerformance />,
};

/* ── Page Root ────────────────────────────────────────────── */
// Uses: .discover-root
export default function Facilities({ initialSection = "Overview" }) {
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  return (
    <div className="discover-root">
      <FacilitiesHero activeSection={activeSection} />
      <SubNav active={activeSection} onSelect={setActiveSection} />
      <main>{SECTION_MAP[activeSection]}</main>
    </div>
  );
}